import prisma from '../../../prisma/context.js'
import { CategoryDTO, CategoryListDTO } from './categories.dto.js'


const getCategories = async () => {
  return await prisma.categorias.findMany({ select: CategoryListDTO, orderBy: { nombre_categoria: 'asc' } })
}

const getCategoryById = async (id) => {
  return await prisma.categorias.findUnique({ where: { id_categoria: Number(id) }, select: CategoryDTO })
}

const createCategory = async (data) => {
  return await prisma.categorias.create({ data, select: CategoryDTO })
}

const updateCategory = async (id, data) => {
  return await prisma.categorias.update({ where: { id_categoria: Number(id) }, data, select: CategoryDTO })
}

const deleteCategory = async (id) => {
  return await prisma.categorias.delete({ where: { id_categoria: Number(id) }, select: { id_categoria: true } })
}

export { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory }