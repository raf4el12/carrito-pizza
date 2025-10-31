import prisma from '../../../../prisma/context.js'
import { HttpError } from '../../../shared/shared.http.error.js'
import { parseId } from './pedidos.parsers.js'

export const checkPedidoExists = async (id_pedido) => {
  const pedido = await prisma.pedidos.findUnique({
    where: { id_pedido: parseId(id_pedido) },
  })

  if (!pedido) {
    throw new HttpError(404, 'Pedido no encontrado')
  }

  return pedido
}

export const checkClienteExists = async (id_cliente) => {
  const cliente = await prisma.usuarios.findUnique({
    where: { id_usuario: parseId(id_cliente) },
  })

  if (!cliente) {
    throw new HttpError(404, 'Cliente no encontrado')
  }

  if (cliente.rol !== 'cliente') {
    throw new HttpError(400, 'El usuario debe ser un cliente')
  }

  if (!cliente.activo) {
    throw new HttpError(400, 'El cliente no está activo')
  }

  return cliente
}

export const checkRepartidorExists = async (id_repartidor) => {
  const repartidor = await prisma.usuarios.findUnique({
    where: { id_usuario: parseId(id_repartidor) },
  })

  if (!repartidor) {
    throw new HttpError(404, 'Repartidor no encontrado')
  }

  if (repartidor.rol !== 'repartidor') {
    throw new HttpError(400, 'El usuario debe ser un repartidor')
  }

  if (!repartidor.activo) {
    throw new HttpError(400, 'El repartidor no está activo')
  }

  return repartidor
}

export const checkCuponExists = async (id_cupon) => {
  const cupon = await prisma.cupones.findUnique({
    where: { id_cupon: parseId(id_cupon) },
  })

  if (!cupon) {
    throw new HttpError(404, 'Cupón no encontrado')
  }

  if (!cupon.activo) {
    throw new HttpError(400, 'El cupón no está activo')
  }

  const ahora = new Date()
  const fechaInicio = new Date(cupon.fecha_inicio)
  const fechaFin = new Date(cupon.fecha_fin)

  if (ahora < fechaInicio || ahora > fechaFin) {
    throw new HttpError(400, 'El cupón no está vigente')
  }

  if (cupon.cantidad_disponible !== null && cupon.cantidad_disponible <= 0) {
    throw new HttpError(400, 'El cupón no tiene usos disponibles')
  }

  return cupon
}

export const checkCarritoHasItems = async (id_cliente) => {
  const items = await prisma.carrito.findMany({
    where: { id_cliente: parseId(id_cliente) },
  })

  if (!items || items.length === 0) {
    throw new HttpError(400, 'El carrito está vacío')
  }

  return items
}

export const checkVarianteExists = async (id_variante) => {
  const variante = await prisma.variantes_producto.findUnique({
    where: { id_variante: parseId(id_variante) },
  })

  if (!variante) {
    throw new HttpError(404, 'Variante no encontrada')
  }

  if (!variante.activo) {
    throw new HttpError(400, 'La variante no está disponible')
  }

  return variante
}

