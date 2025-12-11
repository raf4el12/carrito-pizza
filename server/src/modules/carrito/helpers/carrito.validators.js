import { HttpError } from '../../../shared/shared.http.error.js'

export const CANTIDAD_MIN = 1
export const CANTIDAD_MAX = 50

export const validateCarritoData = (data) => {
  const { id_cliente, id_variante, cantidad } = data

  if (!id_cliente || !id_variante || cantidad === undefined) {
    throw new HttpError('id_cliente, id_variante y cantidad son requeridos', 400)
  }

  validateCantidad(cantidad)
}

export const validateCantidad = (cantidad) => {
  const cantidadNum = Number(cantidad)

  if (isNaN(cantidadNum) || cantidadNum < CANTIDAD_MIN) {
    throw new HttpError(`La cantidad debe ser al menos ${CANTIDAD_MIN}`, 400)
  }

  if (cantidadNum > CANTIDAD_MAX) {
    throw new HttpError(`La cantidad no puede exceder ${CANTIDAD_MAX}`, 400)
  }

  return cantidadNum
}

export const validateIngredientes = (ingredientes) => {
  if (!Array.isArray(ingredientes)) {
    throw new HttpError('Los ingredientes deben ser un array', 400)
  }

  for (const ing of ingredientes) {
    if (!ing.id_ingrediente || !ing.accion) {
      throw new HttpError('Cada ingrediente debe tener id_ingrediente y accion', 400)
    }

    if (!['extra', 'normal', 'quitar'].includes(ing.accion)) {
      throw new HttpError('Accion inválida. Debe ser: extra, normal o quitar', 400)
    }
  }
}