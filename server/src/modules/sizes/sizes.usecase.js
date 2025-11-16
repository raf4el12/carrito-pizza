import prisma from '../../../prisma/context.js'
import { SizeDTO, SizeListDTO } from './sizes.dto.js'

const parsePrice = (value) => {
  if (value === undefined || value === null) return undefined
  const parsed = typeof value === 'string' ? Number(value) : value
  if (Number.isNaN(parsed)) {
    throw new Error('El precio base debe ser un número válido')
  }
  return parsed
}

const getSizes = async () => {
  return prisma.tamanos.findMany({
    where: { deleted_at: null },
    select: SizeListDTO,
    orderBy: { nombre: 'asc' },
  })
}

const getSizeById = async (id) => {
  return prisma.tamanos.findFirst({
    where: { id_tamano: Number(id), deleted_at: null },
    select: SizeDTO,
  })
}

const createSize = async (data) => {
  const { nombre, descripcion, precio_base, activo = true } = data

  return prisma.tamanos.create({
    data: {
      nombre,
      descripcion: descripcion || null,
      precio_base: parsePrice(precio_base) ?? 0,
      activo,
    },
    select: SizeDTO,
  })
}

const updateSize = async (id, data) => {
  const { nombre, descripcion, precio_base, activo } = data

  const updatePayload = {}

  if (nombre !== undefined) updatePayload.nombre = nombre
  if (descripcion !== undefined) updatePayload.descripcion = descripcion || null
  if (precio_base !== undefined) updatePayload.precio_base = parsePrice(precio_base) ?? 0
  if (activo !== undefined) updatePayload.activo = activo

  return prisma.tamanos.update({
    where: { id_tamano: Number(id) },
    data: updatePayload,
    select: SizeDTO,
  })
}

const deleteSize = async (id) => {
  return prisma.tamanos.update({
    where: { id_tamano: Number(id) },
    data: { activo: false, deleted_at: new Date() },
    select: { id_tamano: true },
  })
}

export { getSizes, getSizeById, createSize, updateSize, deleteSize }