import prisma from '../../../prisma/context.js'
import { VariantDTO } from './variants.dto.js'
import {
  normalizeVariantData,
  calculateFinalVariantState,
  buildUpdatePayload,
  hasUniqueFieldsChanged,
} from './utils/variants.utils.js'
import {
  validateUniqueVariant,
  getCurrentVariantForUpdate,
} from './validation/variants.validation.js'

/**
 * Obtiene todas las variantes de productos activas
 * @returns {Promise<Array>} Lista de variantes
 */
const getVariantsProducts = async () => {
  const variants = await prisma.variantes_producto.findMany({
    where: { deleted_at: null },
    select: VariantDTO,
    orderBy: [{ activo: 'desc' }, { id_variante: 'desc' }],
  })

  return variants
}

/**
 * Obtiene una variante por su ID
 * @param {string|number} id - ID de la variante
 * @returns {Promise<Object|null>} La variante encontrada o null
 */
const getVariantProductById = async (id) => {
  const variant = await prisma.variantes_producto.findFirst({
    where: {
      id_variante: Number.parseInt(id, 10),
      deleted_at: null,
    },
    select: VariantDTO,
  })

  return variant
}

/**
 * Crea una nueva variante de producto
 * @param {Object} data - Datos de la variante a crear
 * @returns {Promise<Object>} La variante creada
 */
const createVariantProduct = async (data) => {
  const normalizedData = normalizeVariantData(data)

  await validateUniqueVariant(
    normalizedData.id_producto,
    normalizedData.id_tamano,
    normalizedData.id_tipo_masa,
  )

  const variant = await prisma.variantes_producto.create({
    data: normalizedData,
    select: VariantDTO,
  })

  return variant
}

/**
 * Actualiza una variante de producto existente
 * @param {string|number} id - ID de la variante a actualizar
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>} La variante actualizada
 */
const updateVariantProduct = async (id, data) => {
  const idVariante = Number.parseInt(id, 10)

  const currentVariant = await getCurrentVariantForUpdate(idVariante)
  const finalState = calculateFinalVariantState(currentVariant, data)

  if (hasUniqueFieldsChanged(currentVariant, finalState)) {
    await validateUniqueVariant(
      finalState.id_producto,
      finalState.id_tamano,
      finalState.id_tipo_masa,
      idVariante,
    )
  }

  const updatePayload = buildUpdatePayload(currentVariant, finalState, data)

  const variant = await prisma.variantes_producto.update({
    where: { id_variante: idVariante },
    data: updatePayload,
    select: VariantDTO,
  })

  return variant
}

/**
 * Elimina una variante de producto (soft delete)
 * @param {string|number} id - ID de la variante a eliminar
 * @returns {Promise<number>} ID de la variante eliminada
 */
const deleteVariantProduct = async (id) => {
  const variant = await prisma.variantes_producto.update({
    where: {
      id_variante: Number.parseInt(id, 10),
    },
    data: { activo: false, deleted_at: new Date() },
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
