import prisma from '../../../prisma/context.js'
import { CategoryDTO, CategoryListDTO } from './categories.dto.js'


const getCategories = async () => {
  return await prisma.categorias.findMany({ 
    where: { deleted_at: null },
    select: CategoryListDTO, 
    orderBy: { nombre_categoria: 'asc' } 
  })
}

const getCategoryById = async (id) => {
  return await prisma.categorias.findFirst({ 
    where: { 
      id_categoria: Number(id),
      deleted_at: null 
    }, 
    select: CategoryDTO 
  })
}

const createCategory = async (data) => {
  return await prisma.categorias.create({ data, select: CategoryDTO })
}

const updateCategory = async (id, data) => {
  return await prisma.categorias.update({ where: { id_categoria: Number(id) }, data, select: CategoryDTO })
}

const deleteCategory = async (id) => {
  return await prisma.categorias.update({ 
    where: { id_categoria: Number(id) }, 
    data: { activo: false, deleted_at: new Date() },
    select: { id_categoria: true } 
  })
}

export { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory }