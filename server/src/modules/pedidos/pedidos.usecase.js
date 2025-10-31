import prisma from '../../../prisma/context.js'
import { PedidoDTO, PedidoListDTO, PedidoDetailDTO } from './pedidos.dto.js'
import {
  validatePedidoData,
  validateOrderStatus,
  validatePaymentStatus,
  validateDireccionEntrega,
  checkPedidoExists,
  checkClienteExists,
  checkRepartidorExists,
  checkCuponExists,
  parseId,
} from './helpers/index.js'
import { HttpError } from '../../shared/shared.http.error.js'

// Función helper para calcular totales del carrito
function computeItemTotals(item) {
  const base = Number(item.Variante?.precio_base || 0)
  const extras = (item.Ingredientes || []).reduce((acc, ing) => {
    const precio = Number(ing.Ingrediente?.precio_adicional || 0)
    let factor = 1
    if (ing.accion === 'quitar') factor = 0
    else if (ing.accion === 'extra' || ing.accion === 'normal') factor = 1
    return acc + precio * factor
  }, 0)
  const unitPrice = base + extras
  const subtotal = unitPrice * item.cantidad
  return { unitPrice, subtotal }
}

function calculateTotal(carritoItems) {
  return carritoItems.reduce((acc, item) => {
    const totals = computeItemTotals(item)
    return acc + totals.subtotal
  }, 0)
}

function applyDiscount(total, cupon) {
  if (!cupon) return { descuento: 0, totalFinal: total }

  let descuento = 0
  if (cupon.tipo_descuento === 'porcentaje') {
    descuento = total * (Number(cupon.valor_descuento) / 100)
  } else if (cupon.tipo_descuento === 'monto_fijo') {
    descuento = Number(cupon.valor_descuento)
  }

  const totalFinal = Math.max(0, total - descuento)
  return { descuento, totalFinal }
}

const createPedido = async (data) => {
  const {
    id_cliente,
    direccion_entrega,
    metodo_pago,
    id_cupon_aplicado = null,
    notas_cliente = null,
    fecha_entrega_estimada = null,
  } = data

  // Validar datos básicos
  validatePedidoData(data)
  const direccionValidada = validateDireccionEntrega(direccion_entrega)

  // Verificar que el cliente existe y está activo
  await checkClienteExists(id_cliente)

  // Verificar que el carrito tiene items
  const carritoItems = await prisma.carrito.findMany({
    where: { id_cliente: parseId(id_cliente) },
    include: {
      Variante: {
        include: {
          Producto: true,
          Tamano: true,
          Tipo_Masa: true,
        },
      },
      Ingredientes: {
        include: {
          Ingrediente: true,
        },
      },
    },
  })

  if (!carritoItems || carritoItems.length === 0) {
    throw new HttpError(400, 'El carrito está vacío')
  }

  // Calcular total del carrito
  const subtotal = calculateTotal(carritoItems)

  // Validar y aplicar cupón si existe
  let cupon = null
  let descuentoAplicado = 0
  let totalFinal = subtotal

  if (id_cupon_aplicado) {
    cupon = await checkCuponExists(id_cupon_aplicado)

    // Validar monto mínimo
    if (subtotal < Number(cupon.monto_minimo_compra)) {
      throw new HttpError(
        400,
        `El monto mínimo para usar este cupón es ${cupon.monto_minimo_compra}`
      )
    }

    const descuentoCalculado = applyDiscount(subtotal, cupon)
    descuentoAplicado = descuentoCalculado.descuento
    totalFinal = descuentoCalculado.totalFinal
  }

  // Crear pedido con todos los detalles en una transacción
  const pedido = await prisma.$transaction(async (tx) => {
    // Crear el pedido
    const nuevoPedido = await tx.pedidos.create({
      data: {
        id_cliente: parseId(id_cliente),
        direccion_entrega: direccionValidada,
        metodo_pago: metodo_pago,
        total_pedido: totalFinal,
        descuento_aplicado: descuentoAplicado,
        id_cupon_aplicado: cupon ? parseId(id_cupon_aplicado) : null,
        notas_cliente: notas_cliente?.trim() || null,
        fecha_entrega_estimada: fecha_entrega_estimada ? new Date(fecha_entrega_estimada) : null,
        estado_pedido: 'pendiente',
        estado_pago: 'pendiente',
      },
    })

    // Crear detalles del pedido
    for (const item of carritoItems) {
      const totals = computeItemTotals(item)
      const precioBaseUnitario = Number(item.Variante.precio_base || 0)
      const precioIngredientesAdicionales = totals.unitPrice - precioBaseUnitario

      const detallePedido = await tx.detalle_Pedido.create({
        data: {
          id_pedido: nuevoPedido.id_pedido,
          id_variante: item.id_variante,
          cantidad: item.cantidad,
          precio_base_unitario: precioBaseUnitario,
          precio_ingredientes_adicionales: precioIngredientesAdicionales,
          subtotal: totals.subtotal,
        },
      })

      // Crear ingredientes del detalle
      if (item.Ingredientes && item.Ingredientes.length > 0) {
        const ingredientesDetalle = item.Ingredientes.map((ing) => ({
          id_detalle_pedido: detallePedido.id_detalle_pedido,
          id_ingrediente: ing.id_ingrediente,
          nombre_ingrediente: ing.Ingrediente.nombre,
          precio_ingrediente_unitario: Number(ing.Ingrediente.precio_adicional || 0),
          posicion: ing.posicion || 'completa',
          accion: ing.accion || 'extra',
        }))

        await tx.detalle_Pedido_Ingredientes.createMany({
          data: ingredientesDetalle,
        })
      }
    }

    // Crear historial de estado inicial
    await tx.historial_Estado_Pedido.create({
      data: {
        id_pedido: nuevoPedido.id_pedido,
        estado_anterior: null,
        estado_nuevo: 'pendiente',
        cambiado_por_usuario: parseId(id_cliente),
      },
    })

    // Decrementar cantidad disponible del cupón si existe
    if (cupon && cupon.cantidad_disponible !== null) {
      await tx.cupones.update({
        where: { id_cupon: cupon.id_cupon },
        data: { cantidad_disponible: { decrement: 1 } },
      })
    }

    // Limpiar carrito del cliente
    await tx.carrito_Ingredientes.deleteMany({
      where: {
        CarritoItem: {
          id_cliente: parseId(id_cliente),
        },
      },
    })

    await tx.carrito.deleteMany({
      where: { id_cliente: parseId(id_cliente) },
    })

    return nuevoPedido
  })

  // Retornar el pedido creado con todas sus relaciones
  return await prisma.pedidos.findUnique({
    where: { id_pedido: pedido.id_pedido },
    select: PedidoDTO,
  })
}

const getPedidoById = async (id_pedido) => {
  await checkPedidoExists(id_pedido)
  return await prisma.pedidos.findUnique({
    where: { id_pedido: parseId(id_pedido) },
    select: PedidoDetailDTO,
  })
}

const getPedidosByClienteId = async (id_cliente) => {
  await checkClienteExists(id_cliente)
  return await prisma.pedidos.findMany({
    where: { id_cliente: parseId(id_cliente) },
    select: PedidoListDTO,
    orderBy: { fecha_pedido: 'desc' },
  })
}

const getPedidosByRepartidorId = async (id_repartidor) => {
  await checkRepartidorExists(id_repartidor)
  return await prisma.pedidos.findMany({
    where: { id_repartidor: parseId(id_repartidor) },
    select: PedidoListDTO,
    orderBy: { fecha_pedido: 'desc' },
  })
}

const getAllPedidos = async (filters = {}) => {
  const { estado_pedido, estado_pago } = filters
  const where = {}

  if (estado_pedido) {
    where.estado_pedido = validateOrderStatus(estado_pedido)
  }

  if (estado_pago) {
    where.estado_pago = validatePaymentStatus(estado_pago)
  }

  return await prisma.pedidos.findMany({
    where,
    select: PedidoListDTO,
    orderBy: { fecha_pedido: 'desc' },
  })
}

const updatePedidoEstado = async (id_pedido, nuevoEstado, id_usuario = null) => {
  const pedido = await checkPedidoExists(id_pedido)
  const estadoValidado = validateOrderStatus(nuevoEstado)

  if (pedido.estado_pedido === estadoValidado) {
    throw new HttpError(400, 'El pedido ya está en ese estado')
  }

  // Validaciones de transición de estado
  if (pedido.estado_pedido === 'cancelado') {
    throw new HttpError(400, 'No se puede cambiar el estado de un pedido cancelado')
  }

  if (pedido.estado_pedido === 'entregado' && estadoValidado !== 'entregado') {
    throw new HttpError(400, 'No se puede revertir un pedido entregado')
  }

  return await prisma.$transaction(async (tx) => {
    const pedidoActualizado = await tx.pedidos.update({
      where: { id_pedido: parseId(id_pedido) },
      data: { estado_pedido: estadoValidado },
      select: PedidoDTO,
    })

    // Crear registro en historial
    await tx.historial_Estado_Pedido.create({
      data: {
        id_pedido: parseId(id_pedido),
        estado_anterior: pedido.estado_pedido,
        estado_nuevo: estadoValidado,
        cambiado_por_usuario: id_usuario ? parseId(id_usuario) : null,
      },
    })

    return pedidoActualizado
  })
}

const updatePedidoRepartidor = async (id_pedido, id_repartidor) => {
  await checkPedidoExists(id_pedido)

  if (id_repartidor) {
    await checkRepartidorExists(id_repartidor)
  }

  return await prisma.pedidos.update({
    where: { id_pedido: parseId(id_pedido) },
    data: { id_repartidor: id_repartidor ? parseId(id_repartidor) : null },
    select: PedidoDTO,
  })
}

const updatePedido = async (id_pedido, data) => {
  await checkPedidoExists(id_pedido)

  const updateData = {}

  if (data.estado_pedido !== undefined) {
    updateData.estado_pedido = validateOrderStatus(data.estado_pedido)
  }

  if (data.estado_pago !== undefined) {
    updateData.estado_pago = validatePaymentStatus(data.estado_pago)
  }

  if (data.direccion_entrega !== undefined) {
    updateData.direccion_entrega = validateDireccionEntrega(data.direccion_entrega)
  }

  if (data.notas_cliente !== undefined) {
    updateData.notas_cliente = data.notas_cliente?.trim() || null
  }

  if (data.id_repartidor !== undefined) {
    if (data.id_repartidor) {
      await checkRepartidorExists(data.id_repartidor)
      updateData.id_repartidor = parseId(data.id_repartidor)
    } else {
      updateData.id_repartidor = null
    }
  }

  if (data.fecha_entrega_estimada !== undefined) {
    updateData.fecha_entrega_estimada = data.fecha_entrega_estimada
      ? new Date(data.fecha_entrega_estimada)
      : null
  }

  return await prisma.pedidos.update({
    where: { id_pedido: parseId(id_pedido) },
    data: updateData,
    select: PedidoDTO,
  })
}

const deletePedido = async (id_pedido) => {
  await checkPedidoExists(id_pedido)

  // Solo permitir eliminar pedidos pendientes o cancelados
  const pedido = await prisma.pedidos.findUnique({
    where: { id_pedido: parseId(id_pedido) },
  })

  if (pedido.estado_pedido !== 'pendiente' && pedido.estado_pedido !== 'cancelado') {
    throw new HttpError(
      400,
      'No se puede eliminar un pedido que ya fue procesado'
    )
  }

  return await prisma.pedidos.delete({
    where: { id_pedido: parseId(id_pedido) },
    select: { id_pedido: true },
  })
}

export default {
  createPedido,
  getPedidoById,
  getPedidosByClienteId,
  getPedidosByRepartidorId,
  getAllPedidos,
  updatePedidoEstado,
  updatePedidoRepartidor,
  updatePedido,
  deletePedido,
}
