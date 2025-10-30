import { HttpError } from '../../../shared/shared.http.error.js'

export const CANTIDAD_MIN = 1
export const CANTIDAD_MAX = 50

export const validateCarritoData = (data) => {
  const { id_cliente, id_variante, cantidad } = data

  if (!id_cliente || !id_variante || cantidad === undefined) {
    throw new HttpError(400, 'id_cliente, id_variante y cantidad son requeridos')
  }

  validateCantidad(cantidad)
}

export const validateCantidad = (cantidad) => {
  const cantidadNum = Number(cantidad)

  if (isNaN(cantidadNum) || cantidadNum < CANTIDAD_MIN) {
    throw new HttpError(400, `La cantidad debe ser al menos ${CANTIDAD_MIN}`)
  }

  if (cantidadNum > CANTIDAD_MAX) {
    throw new HttpError(400, `La cantidad no puede exceder ${CANTIDAD_MAX}`)
  }

  return cantidadNum
}

export const validateIngredientes = (ingredientes) => {
  if (!Array.isArray(ingredientes)) {
    throw new HttpError(400, 'Los ingredientes deben ser un array')
  }

  for (const ing of ingredientes) {
    if (!ing.id_ingrediente || !ing.accion) {
      throw new HttpError(400, 'Cada ingrediente debe tener id_ingrediente y accion')
    }

    if (!['agregar', 'quitar', 'doble'].includes(ing.accion)) {
      throw new HttpError(400, 'Accion inválida. Debe ser: agregar, quitar, o doble')
    }
  }
}