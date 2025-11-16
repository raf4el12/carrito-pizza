import prisma from '../../../prisma/context.js'
import { ProductDTO } from './products.dto.js'

const getProducts = async () => {
  return await prisma.productos.findMany({ select: ProductDTO })
}

const getProductById = async (id) => {
  return await prisma.productos.findUnique({
    where: { id_producto: Number(id) },
    select: ProductDTO,
  })
}

const createProduct = async (data) => {
  const { nombre, descripcion, imagen_url, id_categoria, estado = 'activo' } = data

  if (!id_categoria) {
    throw new Error('La categoría es obligatoria')
  }

  const payload = {
    nombre,
    descripcion: descripcion || null,
    imagen_url: imagen_url || null,
    estado,
    id_categoria: Number(id_categoria),
  }

  return await prisma.productos.create({ data: payload, select: ProductDTO })
}


const updateProduct = async (id, data) => {
  const { nombre, descripcion, imagen_url, id_categoria, estado } = data

  const payload = {}

  if (nombre !== undefined) payload.nombre = nombre
  if (descripcion !== undefined) payload.descripcion = descripcion
  if (imagen_url !== undefined) payload.imagen_url = imagen_url
  if (estado !== undefined) payload.estado = estado
  if (id_categoria !== undefined) payload.id_categoria = Number(id_categoria)

  return await prisma.productos.update({
    where: { id_producto: Number(id) },
    data: payload,
    select: ProductDTO,
  })
}


const deleteProduct = async (id) => {
  return await prisma.productos.delete({ where: { id_producto: Number(id) }, select: { id_producto: true } })
}

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct }