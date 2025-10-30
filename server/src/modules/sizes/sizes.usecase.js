import prisma from '../../../prisma/context.js'
import { SizeDTO, SizeListDTO } from './sizes.dto.js'

const getSizes = async () => {
  return await prisma.tamanos.findMany({ select: SizeListDTO, orderBy: { nombre: 'asc' } })
}

const getSizeById = async (id) => {
  return await prisma.tamanos.findUnique({ where: { id_tamano: Number(id) }, select: SizeDTO })
}

const createSize = async (data) => {
    const { nombre, descripcion } = data

    return await prisma.tamanos.create({ data: { nombre, descripcion }, select: SizeDTO })
}

const updateSize = async (id, data) => {
    const { nombre, descripcion } = data

    return await prisma.tamanos.update({ where: { id_tamano: Number(id) }, data: { nombre, descripcion }, select: SizeDTO })
}

const deleteSize = async (id) => {
  return await prisma.tamanos.delete({ where: { id_tamano: Number(id) }, select: { id_tamano: true } })
}

export {
    getSizes,
    getSizeById,
    createSize,
    updateSize,
    deleteSize
}