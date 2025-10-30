import prisma from '../../../prisma/context.js'
import { VariantDTO } from './variants.dto.js'

const getVariantsProducts = async () => {
  const variants = await prisma.variantes_producto.findMany({
    select: VariantDTO,
    orderBy: [{ activo: 'desc' }, { id_variante: 'desc' }],
  })

  return variants
}

const getVariantProductById = async (id) => {
  const variant = await prisma.variantes_producto.findUnique({
    where: { id_variante: Number.parseInt(id, 10) },
    select: VariantDTO,
  })

  return variant
}

const createVariantProduct = async (data) => {
  const {
    id_producto,
    id_tamano,
    id_tipo_masa = null,
    precio_base,
    sku = null,
    activo = true,
  } = data

  const variant = await prisma.variantes_producto.create({
    data: {
      id_producto: Number(id_producto),
      id_tamano: Number(id_tamano),
      id_tipo_masa: id_tipo_masa !== null ? Number(id_tipo_masa) : null,
      precio_base,
      sku,
      activo,
    },
    select: VariantDTO,
  })

  return variant
}


const updateVariantProduct = async (id, data) => {
  const {
    id_producto,
    id_tamano,
    id_tipo_masa,
    precio_base,
    sku,
    activo,
  } = data

  const updateData = {
    ...(id_producto !== undefined ? { id_producto: Number(id_producto) } : {}),
    ...(id_tamano !== undefined ? { id_tamano: Number(id_tamano) } : {}),
    ...(id_tipo_masa !== undefined
      ? { id_tipo_masa: id_tipo_masa === null ? null : Number(id_tipo_masa) }
      : {}),
    ...(precio_base !== undefined ? { precio_base } : {}),
    ...(sku !== undefined ? { sku } : {}),
    ...(activo !== undefined ? { activo } : {}),
  }

  const variant = await prisma.variantes_producto.update({
    where: { id_variante: Number.parseInt(id, 10) },
    data: updateData,
    select: VariantDTO,
  })

  return variant
}

const deleteVariantProduct = async (id) => {
  const variant = await prisma.variantes_producto.delete({
    where: {
      id_variante: Number.parseInt(id, 10),
    },
    select: { id_variante: true },
  })

  return variant.id_variante
}

export {
  getVariantsProducts,
  getVariantProductById,
  createVariantProduct,
  updateVariantProduct,
  deleteVariantProduct,
}