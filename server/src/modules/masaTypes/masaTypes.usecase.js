import prisma from '../../../prisma/context.js'
import { MasaTypeDTO, MasaTypeListDTO } from './masaTypes.dto.js'

const parsePrice = (value) => {
  if (value === undefined || value === null) return undefined
  const parsed = typeof value === 'string' ? Number(value) : value
  if (Number.isNaN(parsed)) {
    throw new Error('El precio adicional debe ser un número válido')
  }
  return parsed
}

const getMasaTypes = async () => {
  return prisma.tipos_Masa.findMany({
    where: { deleted_at: null },
    select: MasaTypeListDTO,
    orderBy: { nombre: 'asc' },
  })
}

const getMasaTypeById = async (id) => {
  return prisma.tipos_Masa.findFirst({
    where: { id_tipo_masa: Number(id), deleted_at: null },
    select: MasaTypeDTO,
  })
}

const createMasaType = async (data) => {
  const { nombre, descripcion, precio_adicional, activo = true } = data

  return prisma.tipos_Masa.create({
    data: {
      nombre,
      descripcion: descripcion || null,
      precio_adicional: parsePrice(precio_adicional) ?? 0,
      activo,
    },
    select: MasaTypeDTO,
  })
}

const updateMasaType = async (id, data) => {
  const { nombre, descripcion, precio_adicional, activo } = data
  const updatePayload = {}

  if (nombre !== undefined) updatePayload.nombre = nombre
  if (descripcion !== undefined) updatePayload.descripcion = descripcion || null
  if (precio_adicional !== undefined) {
    updatePayload.precio_adicional = parsePrice(precio_adicional) ?? 0
  }
  if (activo !== undefined) updatePayload.activo = activo

  return prisma.tipos_Masa.update({
    where: { id_tipo_masa: Number(id) },
    data: updatePayload,
    select: MasaTypeDTO,
  })
}

const deleteMasaType = async (id) => {
  return prisma.tipos_Masa.update({
    where: { id_tipo_masa: Number(id) },
    data: { activo: false, deleted_at: new Date() },
    select: { id_tipo_masa: true },
  })
}

export { getMasaTypes, getMasaTypeById, createMasaType, updateMasaType, deleteMasaType }


