import ApiBackend from './api.backend'
import {
  AddCartItemPayload,
  CartResponse,
  UpdateCartItemPayload,
} from '../../types/cart/cart.schema'

const base = '/carrito'

export const carritoService = {
  getByCliente: async (id_cliente: number) => {
    return ApiBackend.get(`${base}/cliente/${id_cliente}`) as Promise<CartResponse>
  },
  addItem: async (payload: AddCartItemPayload) => {
    return ApiBackend.post(base, payload)
  },
  updateItem: async (id_carrito: number, payload: UpdateCartItemPayload) => {
    return ApiBackend.put(`${base}/${id_carrito}`, payload)
  },
  removeItem: async (id_carrito: number) => {
    return ApiBackend.delete(`${base}/${id_carrito}`)
  },
  clear: async (id_cliente: number) => {
    return ApiBackend.delete(`${base}/clear/${id_cliente}`)
  },
}

export default carritoService
