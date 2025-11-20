const parseNumberParam = (value) => {
  if (value === undefined || value === null) return undefined
  const parsed = Number(value)
  return Number.isNaN(parsed) ? undefined : parsed
}

const buildReviewFilters = ({ status, productId, clientId, search, visible }) => ({
  status,
  productId: parseNumberParam(productId),
  clientId: parseNumberParam(clientId),
  search,
  visible,
})

const sendNotFound = (res, entity = 'Reseña') => {
  res.status(404).json({ message: `${entity} no encontrada` })
}

export { parseNumberParam, buildReviewFilters, sendNotFound }
