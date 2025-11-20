import prisma from '../../../../prisma/context.js'
import { HttpError } from '../../../shared/shared.http.error.js'

export const validateUniqueVariant = async (
  idProducto,
  idTamano,
  idTipoMasa,
  excludeId = null,
) => {
  const whereClause = {
    id_producto: idProducto,
    id_tamano: idTamano,
    id_tipo_masa: idTipoMasa,
    deleted_at: null,
  }

  if (excludeId !== null) {
    whereClause.NOT = { id_variante: excludeId }
  }

  const existingVariant = await prisma.variantes_producto.findFirst({
    where: whereClause,
  })

  if (existingVariant) {
    throw new HttpError(
      'Ya existe una variante con esta combinación de producto, tamaño y tipo de masa',
      409,
    )
  }
}

export const validateVariantExists = async (idVariante) => {
  const variant = await prisma.variantes_producto.findFirst({
    where: {
      id_variante: idVariante,
      deleted_at: null,
    },
    select: {
      id_variante: true,
      id_producto: true,
      id_tamano: true,
      id_tipo_masa: true,
      precio_base: true,
      sku: true,
      activo: true,
    },
  })

  if (!variant) {
    throw new HttpError('Variante no encontrada', 404)
  }

  return variant
}

export const getCurrentVariantForUpdate = async (idVariante) => {
  const variant = await prisma.variantes_producto.findUnique({
    where: { id_variante: idVariante },
    select: {
      id_producto: true,
      id_tamano: true,
      id_tipo_masa: true,
      precio_base: true,
      sku: true,
      activo: true,
    },
  })

  if (!variant) {
    throw new HttpError('Variante no encontrada', 404)
  }

  return variant
}

