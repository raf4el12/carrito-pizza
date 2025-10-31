import { HttpError } from '../../../shared/shared.http.error.js'

export const ALLOWED_ORDER_STATUSES = ['pendiente', 'aceptado', 'en_camino', 'entregado', 'cancelado']
export const ALLOWED_PAYMENT_METHODS = ['tarjeta', 'billetera_virtual', 'efectivo']
export const ALLOWED_PAYMENT_STATUSES = ['pendiente', 'pagado', 'fallido', 'reembolsado']

export const validatePedidoData = (data) => {
  const { id_cliente, direccion_entrega, metodo_pago } = data

  if (!id_cliente) {
    throw new HttpError(400, 'id_cliente es requerido')
  }

  if (!direccion_entrega || direccion_entrega.trim().length === 0) {
    throw new HttpError(400, 'direccion_entrega es requerida')
  }

  if (!metodo_pago) {
    throw new HttpError(400, 'metodo_pago es requerido')
  }

  if (!ALLOWED_PAYMENT_METHODS.includes(metodo_pago)) {
    throw new HttpError(400, `metodo_pago debe ser uno de: ${ALLOWED_PAYMENT_METHODS.join(', ')}`)
  }
}

export const validateOrderStatus = (estado) => {
  if (!estado) return undefined
  
  const normalizedEstado = estado.toLowerCase()
  if (!ALLOWED_ORDER_STATUSES.includes(normalizedEstado)) {
    throw new HttpError(400, `estado_pedido debe ser uno de: ${ALLOWED_ORDER_STATUSES.join(', ')}`)
  }
  return normalizedEstado
}

export const validatePaymentStatus = (estado) => {
  if (!estado) return undefined
  
  const normalizedEstado = estado.toLowerCase()
  if (!ALLOWED_PAYMENT_STATUSES.includes(normalizedEstado)) {
    throw new HttpError(400, `estado_pago debe ser uno de: ${ALLOWED_PAYMENT_STATUSES.join(', ')}`)
  }
  return normalizedEstado
}

export const validateDireccionEntrega = (direccion) => {
  if (!direccion || direccion.trim().length === 0) {
    throw new HttpError(400, 'direccion_entrega es requerida')
  }
  
  if (direccion.trim().length < 10) {
    throw new HttpError(400, 'direccion_entrega debe tener al menos 10 caracteres')
  }
  
  if (direccion.length > 255) {
    throw new HttpError(400, 'direccion_entrega no puede exceder 255 caracteres')
  }
  
  return direccion.trim()
}

