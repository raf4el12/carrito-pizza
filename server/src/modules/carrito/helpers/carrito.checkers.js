import prisma from '../../../prisma/context.js'
import { HttpError } from '../../../shared/shared.http.error.js'
import { parseId } from './carrito.parsers.js'

export const checkCarritoItemExists = async (id_carrito, id_cliente = null) => {
  const item = await prisma.carrito.findUnique({
    where: { id_carrito: parseId(id_carrito) },
    include: {
      Ingredientes: { select: { id_ingrediente: true } },
    },
  })

  if (!item) {
    throw new HttpError(404, 'Item del carrito no encontrado')
  }
  
  if (id_cliente !== null && item.id_cliente !== parseId(id_cliente)) {
    throw new HttpError(403, 'No tienes permiso para modificar este item')
  }

  return item
}

export const checkClienteExists = async (id_cliente) => {
  const cliente = await prisma.usuarios.findUnique({
    where: { id_usuario: parseId(id_cliente) },
  })

  if (!cliente) {
    throw new HttpError(404, 'Cliente no encontrado')
  }

  return cliente
}

export const checkVarianteExists = async (id_variante) => {
  const variante = await prisma.variantes_producto.findUnique({
    where: { id_variante: parseId(id_variante) },
  })

  if (!variante) {
    throw new HttpError(404, 'Variante de producto no encontrada')
  }

  if (!variante.activo) {
    throw new HttpError(400, 'Esta variante de producto no está disponible')
  }

  return variante
}

export const checkIngredientesExist = async (ingredientes) => {
  const ids = ingredientes.map((ing) => parseId(ing.id_ingrediente))

  const foundIngredientes = await prisma.ingredientes.findMany({
    where: {
      id_ingrediente: { in: ids },
      disponible: true,
    },
  })

  if (foundIngredientes.length !== ids.length) {
    throw new HttpError(400, 'Algunos ingredientes no existen o no están disponibles')
  }

  return foundIngredientes
}

export const checkDuplicateCarritoItem = async (id_cliente, id_variante, ingredientes = []) => {
  const items = await prisma.carrito.findMany({
    where: {
      id_cliente: parseId(id_cliente),
      id_variante: parseId(id_variante),
    },
    include: {
      Ingredientes: true,
    },
  })

  if (ingredientes.length > 0) {
    return null
  }

  const duplicado = items.find((item) => item.Ingredientes.length === 0)

  return duplicado || null
}