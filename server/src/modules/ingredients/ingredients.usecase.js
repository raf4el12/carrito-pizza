import prisma from '../../../prisma/context.js'
import { IngredientDTO, IngredientListDTO } from './ingredients.dto.js'

const getIngredients = async () => {
  return await prisma.ingredientes.findMany({ 
    where: { deleted_at: null },
    select: IngredientListDTO, 
    orderBy: { nombre: 'asc' } 
  })
}

const getIngredientById = async (id) => {
  return await prisma.ingredientes.findFirst({ 
    where: { 
      id_ingrediente: Number.parseInt(id, 10),
      deleted_at: null 
    }, 
    select: IngredientDTO 
  })
}

const createIngredient = async (data) => {
    const { nombre, precio_adicional, stock_disponible, activo } = data

    return await prisma.ingredientes.create({
        data: {
            nombre,
            precio_adicional: Number(precio_adicional),
            stock_disponible: stock_disponible ? Number(stock_disponible) : 0,
            activo: activo !== undefined ? activo : true
        },
        select: IngredientDTO
    })
}

const updateIngredient = async (id, data) => {
    const { nombre, precio_adicional, stock_disponible, activo } = data

    const payload = {
        nombre,
        activo,
        ...(precio_adicional !== undefined && { precio_adicional: Number(precio_adicional) }),
        ...(stock_disponible !== undefined && { stock_disponible: Number(stock_disponible) }),
    }

    return await prisma.ingredientes.update({
        where: { id_ingrediente: Number.parseInt(id, 10) },
        data: payload,
        select: IngredientDTO
    })
}

const deleteIngredient = async (id) => {
  return await prisma.ingredientes.update({ 
    where: { id_ingrediente: Number.parseInt(id, 10) }, 
    data: { activo: false, deleted_at: new Date() },
    select: { id_ingrediente: true } 
  })
}

export {
    getIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
}