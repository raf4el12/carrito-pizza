export const normalizeVariantData = (data) => {
  const {
    id_producto,
    id_tamano,
    id_tipo_masa = null,
    precio_base,
    sku = null,
    activo = true,
  } = data

  return {
    id_producto: Number(id_producto),
    id_tamano: Number(id_tamano),
    id_tipo_masa: id_tipo_masa !== null ? Number(id_tipo_masa) : null,
    precio_base,
    sku,
    activo,
  }
}

export const calculateFinalVariantState = (currentVariant, updateData) => {
  return {
    id_producto:
      updateData.id_producto !== undefined
        ? Number(updateData.id_producto)
        : currentVariant.id_producto,
    id_tamano:
      updateData.id_tamano !== undefined
        ? Number(updateData.id_tamano)
        : currentVariant.id_tamano,
    id_tipo_masa:
      updateData.id_tipo_masa !== undefined
        ? updateData.id_tipo_masa === null
          ? null
          : Number(updateData.id_tipo_masa)
        : currentVariant.id_tipo_masa,
    precio_base:
      updateData.precio_base !== undefined
        ? updateData.precio_base
        : currentVariant.precio_base,
    sku: updateData.sku !== undefined ? updateData.sku : currentVariant.sku,
    activo: updateData.activo !== undefined ? updateData.activo : currentVariant.activo,
  }
}

export const buildUpdatePayload = (currentVariant, finalState, updateData) => {
  const payload = {}

  if (updateData.id_producto !== undefined) {
    payload.id_producto = finalState.id_producto
  }
  if (updateData.id_tamano !== undefined) {
    payload.id_tamano = finalState.id_tamano
  }
  if (updateData.id_tipo_masa !== undefined) {
    payload.id_tipo_masa = finalState.id_tipo_masa
  }
  if (updateData.precio_base !== undefined) {
    payload.precio_base = finalState.precio_base
  }
  if (updateData.sku !== undefined) {
    payload.sku = finalState.sku
  }
  if (updateData.activo !== undefined) {
    payload.activo = finalState.activo
  }

  return payload
}

export const hasUniqueFieldsChanged = (current, final) => {
  return (
    current.id_producto !== final.id_producto ||
    current.id_tamano !== final.id_tamano ||
    current.id_tipo_masa !== final.id_tipo_masa
  )
}