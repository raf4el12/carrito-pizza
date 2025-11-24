import prisma from '../../../prisma/context.js'
import { ProductDTO } from './products.dto.js'
import { isValidHttpUrl } from '../../shared/shared.url.utils.js'

const getProducts = async () => {
  return await prisma.productos.findMany({ 
    where: { deleted_at: null },
    select: ProductDTO 
  })
}

const getProductById = async (id) => {
  return await prisma.productos.findFirst({
    where: { 
      id_producto: Number(id),
      deleted_at: null 
    },
    select: ProductDTO,
  })
}

const normalizeImageUrl = (value) => {
  const trimmed = typeof value === 'string' ? value.trim() : ''
  if (!trimmed) return null
  if (!isValidHttpUrl(trimmed)) {
    throw new Error('La URL de la imagen debe ser un enlace http/https válido')
  }
  return trimmed
}

const createProduct = async (data) => {
  const { nombre, descripcion, imagen_url, precio_base, id_categoria, estado = 'activo' } = data

  if (!id_categoria) {
    throw new Error('La categoría es obligatoria')
  }

  if (precio_base === undefined || precio_base === null) {
    throw new Error('El precio base es obligatorio')
  }

  const payload = {
    nombre,
    descripcion: descripcion || null,
    imagen_url: normalizeImageUrl(imagen_url),
    precio_base: Number(precio_base),
    estado,
    id_categoria: Number(id_categoria),
  }

  return await prisma.productos.create({ data: payload, select: ProductDTO })
}


const updateProduct = async (id, data) => {
  const { nombre, descripcion, imagen_url, precio_base, id_categoria, estado } = data

  const payload = {}

  if (nombre !== undefined) payload.nombre = nombre
  if (descripcion !== undefined) payload.descripcion = descripcion
  if (imagen_url !== undefined) payload.imagen_url = normalizeImageUrl(imagen_url)
  if (precio_base !== undefined) payload.precio_base = Number(precio_base)
  if (estado !== undefined) payload.estado = estado
  if (id_categoria !== undefined) payload.id_categoria = Number(id_categoria)

  return await prisma.productos.update({
    where: { id_producto: Number(id) },
    data: payload,
    select: ProductDTO,
  })
}


const deleteProduct = async (id) => {
  return await prisma.productos.update({ 
    where: { id_producto: Number(id) }, 
    data: { deleted_at: new Date() },
    select: { id_producto: true } 
  })
}

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct }