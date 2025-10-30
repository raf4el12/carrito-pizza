import prisma from '../../../prisma/context.js'
import { CarritoItemDTO } from './carrito.dto.js'
import {
  validateCarritoData,
  validateCantidad,
  validateIngredientes,
  checkCarritoItemExists,
  checkClienteExists,
  checkVarianteExists,
  checkIngredientesExist,
  checkDuplicateCarritoItem,
  parseId,
  parseIngredientes,
} from './helpers/index.js'

const selectCarrito = CarritoItemDTO

const getCarritoByClienteId = async (id_cliente) => {
  await checkClienteExists(id_cliente)

  const items = await prisma.carrito.findMany({
    where: {
      id_cliente: parseId(id_cliente),
    },
    select: selectCarrito,
    orderBy: {
      fecha_adicion: 'desc',
    },
  })

  const enriched = await enrichItemsWithTotals(items)
  const totals = sumCartTotals(enriched)
  return { items: enriched, totals }
}

const createCarritoItem = async (data) => {
  const { id_cliente, id_variante, cantidad, ingredientes = [] } = data

  validateCarritoData(data)
  validateIngredientes(ingredientes)

  await checkClienteExists(id_cliente)
  await checkVarianteExists(id_variante)

  if (ingredientes.length > 0) {
    await checkIngredientesExist(ingredientes)
  }

  const duplicado = await checkDuplicateCarritoItem(id_cliente, id_variante, ingredientes)

  if (duplicado) {
    return await updateCarritoCantidad(
      duplicado.id_carrito,
      duplicado.cantidad + validateCantidad(cantidad),
      id_cliente
    )
  }

  const cantidadValidada = validateCantidad(cantidad)
  const ingredientesParsed = parseIngredientes(ingredientes)

  const created = await prisma.$transaction(async (tx) => {
    await assertStockAvailable(tx, ingredientesParsed, cantidadValidada)
    const item = await tx.carrito.create({
      data: {
        id_cliente: parseId(id_cliente),
        id_variante: parseId(id_variante),
        cantidad: cantidadValidada,
        Ingredientes: { create: ingredientesParsed },
      },
      select: selectCarrito,
    })
    await decrementStock(tx, ingredientesParsed, cantidadValidada)
    return item
  })

  const [enriched] = await enrichItemsWithTotals([created])
  return enriched
}

const updateCarritoCantidad = async (id_carrito, nuevaCantidad, id_cliente = null) => {
    const carritoIdNum = parseId(id_carrito)
    const cantidadValidada = validateCantidad(nuevaCantidad)
  
    const itemPrevio = await checkCarritoItemExists(carritoIdNum, id_cliente) 
    const cantidadPrevia = itemPrevio.cantidad
    
    const delta = cantidadValidada - cantidadPrevia 
  
    const [itemActualizado] = await prisma.$transaction(async (tx) => {
      const ingredientesParsed = itemPrevio.Ingredientes.map(i => ({ id_ingrediente: i.id_ingrediente }))
  
      if (delta > 0) {
        await assertStockAvailable(tx, ingredientesParsed, delta) 
        await decrementStock(tx, ingredientesParsed, delta)     
      } else if (delta < 0) {
        await incrementStock(tx, ingredientesParsed, Math.abs(delta)) 
      }
      
      const item = await tx.carrito.update({
        where: { id_carrito: carritoIdNum },
        data: { cantidad: cantidadValidada },
        select: selectCarrito,
      })
      
      return await enrichItemsWithTotals([item])
    })
  
    return itemActualizado
  }

const deleteCarritoItem = async (id_carrito, id_cliente = null) => {
    const carritoIdNum = parseId(id_carrito)
    
    const item = await checkCarritoItemExists(carritoIdNum, id_cliente)
  
    return await prisma.$transaction(async (tx) => {
      if (item.Ingredientes && item.Ingredientes.length > 0) {
        const ingredientesParsed = item.Ingredientes.map(i => ({ id_ingrediente: i.id_ingrediente }))
        await incrementStock(tx, ingredientesParsed, item.cantidad) 
      }
  
      return await tx.carrito.delete({
        where: { id_carrito: carritoIdNum },
      })
    })
  }

  const clearCarritoByClienteId = async (id_cliente) => {
    const clienteIdNum = parseId(id_cliente)
    await checkClienteExists(clienteIdNum)
  
    const itemsABorrar = await prisma.carrito.findMany({
      where: { id_cliente: clienteIdNum },
      include: { Ingredientes: { select: { id_ingrediente: true } } } 
    })
  
    return await prisma.$transaction(async (tx) => {
      for (const item of itemsABorrar) {
        if (item.Ingredientes && item.Ingredientes.length > 0) {
          const ingredientesParsed = item.Ingredientes.map(i => ({ id_ingrediente: i.id_ingrediente }))
          await incrementStock(tx, ingredientesParsed, item.cantidad)
        }
      }
  
      // --- FIX APLICADO AQUÍ ---
      // Ejecuta las consultas de borrado secuencialmente dentro de la transacción existente
      const delIngr = await tx.carrito_Ingredientes.deleteMany({
        where: { CarritoItem: { id_cliente: clienteIdNum } },
      })
  
      const delItems = await tx.carrito.deleteMany({
        where: { id_cliente: clienteIdNum },
      })
      // --- FIN DEL FIX ---
  
      return { deletedIngredientes: delIngr.count, deletedCarrito: delItems.count }
    })
  }

function computeItemTotals(item) {
  const base = Number(item.Variante.precio_base || 0)
  const extras = item.Ingredientes.reduce((acc, ing) => {
    const p = Number(ing.Ingrediente?.precio_adicional || 0)
    const factor = ing.accion === 'doble' ? 2 : ing.accion === 'quitar' ? 0 : 1
    return acc + p * factor
  }, 0)
  const unit = base + extras
  const subtotal = unit * item.cantidad
  return { unit, subtotal }
}

async function enrichItemsWithTotals(items) {
  return items.map((item) => {
    const totals = computeItemTotals(item)
    return { ...item, totals }
  })
}

function sumCartTotals(items) {
  const total = items.reduce((acc, it) => acc + Number(it.totals?.subtotal || 0), 0)
  return { total }
}

async function assertStockAvailable(tx, ingredientesParsed, cantidad) {
  if (!ingredientesParsed?.length) return
  const ids = ingredientesParsed.map((i) => i.id_ingrediente)
  const rows = await tx.ingredientes.findMany({ where: { id_ingrediente: { in: ids } }, select: { id_ingrediente: true, stock_disponible: true } })
  for (const i of ingredientesParsed) {
    const row = rows.find((r) => r.id_ingrediente === i.id_ingrediente)
    if (!row || row.stock_disponible < cantidad) {
      throw new Error('Stock insuficiente para algún ingrediente')
    }
  }
}

async function decrementStock(tx, ingredientesParsed, cantidad) {
  if (!ingredientesParsed?.length) return
  for (const i of ingredientesParsed) {
    await tx.ingredientes.update({
      where: { id_ingrediente: i.id_ingrediente },
      data: { stock_disponible: { decrement: cantidad } },
    })
  }
}

async function incrementStock(tx, ingredientesParsed, cantidad) {
  if (!ingredientesParsed?.length) return
  for (const i of ingredientesParsed) {
    await tx.ingredientes.update({
      where: { id_ingrediente: i.id_ingrediente },
      data: { stock_disponible: { increment: cantidad } },
    })
  }
}

export {
    getCarritoByClienteId,
    createCarritoItem,
    updateCarritoCantidad,
    deleteCarritoItem,
    clearCarritoByClienteId,
  }