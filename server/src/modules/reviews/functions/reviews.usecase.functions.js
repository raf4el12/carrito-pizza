const parseBoolean = (value) => {
  if (value === undefined || value === null) return undefined
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true
    if (value.toLowerCase() === 'false') return false
  }
  return undefined
}

const buildFilters = ({ status, productId, clientId, visible, search }) => {
  const where = { deleted_at: null }

  if (status) {
    where.estado = status
  }

  if (productId) {
    where.id_producto = Number(productId)
  }

  if (clientId) {
    where.id_cliente = Number(clientId)
  }

  const visibility = parseBoolean(visible)
  if (visibility !== undefined) {
    where.visible = visibility
  }

  if (search) {
    where.OR = [
      { titulo: { contains: search, mode: 'insensitive' } },
      { comentario: { contains: search, mode: 'insensitive' } },
      { Producto: { nombre: { contains: search, mode: 'insensitive' } } },
      { Cliente: { nombre: { contains: search, mode: 'insensitive' } } },
      { Cliente: { apellido: { contains: search, mode: 'insensitive' } } },
    ]
  }

  return where
}

const sanitizeReviewPayload = (data) => {
  const payload = { ...data }

  if (payload.id_producto !== undefined) {
    payload.id_producto = Number(payload.id_producto)
  }

  if (payload.id_cliente !== undefined) {
    payload.id_cliente = Number(payload.id_cliente)
  }

  if (payload.rating !== undefined) {
    payload.rating = Math.min(5, Math.max(1, Number(payload.rating)))
  }

  return payload
}

export { parseBoolean, buildFilters, sanitizeReviewPayload }
