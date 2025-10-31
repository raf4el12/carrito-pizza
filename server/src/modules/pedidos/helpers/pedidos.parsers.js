export const parseId = (id) => {
  const parsed = Number.parseInt(id, 10)
  if (isNaN(parsed) || parsed <= 0) {
    throw new Error('ID inválido')
  }
  return parsed
}

export const parseDecimal = (value) => {
  const parsed = Number.parseFloat(value)
  if (isNaN(parsed) || parsed < 0) {
    throw new Error('Valor decimal inválido')
  }
  return parsed
}

