import ApiBackend from './api.backend'
import { CreatePedidoPayload, PedidoDetail, PedidoListItem, UpdatePedidoPayload } from '../../types/pedidos/pedidos.schema'

const base = '/pedidos'

export const pedidosService = {
  // Crear pedido (cliente)
  create: async (payload: CreatePedidoPayload) => {
    return ApiBackend.post(base, payload) as Promise<PedidoDetail>
  },

  // Listar pedidos por cliente
  listByCliente: async (id_cliente: number) => {
    return ApiBackend.get(`${base}/cliente/${id_cliente}`) as Promise<PedidoListItem[]>
  },

  // Obtener pedido por ID
  getById: async (id_pedido: number) => {
    return ApiBackend.get(`${base}/${id_pedido}`) as Promise<PedidoDetail>
  },

  // Listar todos los pedidos (admin)
  listAll: async (filters?: { estado_pedido?: string; estado_pago?: string }) => {
    const params = new URLSearchParams()
    if (filters?.estado_pedido) params.append('estado_pedido', filters.estado_pedido)
    if (filters?.estado_pago) params.append('estado_pago', filters.estado_pago)
    const query = params.toString() ? `?${params.toString()}` : ''
    return ApiBackend.get(`${base}/all${query}`) as Promise<PedidoListItem[]>
  },

  // Actualizar estado del pedido (admin)
  updateEstado: async (id_pedido: number, estado_pedido: string) => {
    return ApiBackend.put(`${base}/${id_pedido}/estado`, { estado_pedido }) as Promise<PedidoDetail>
  },

  // Asignar repartidor (admin)
  updateRepartidor: async (id_pedido: number, id_repartidor: number | null) => {
    return ApiBackend.put(`${base}/${id_pedido}/repartidor`, { id_repartidor }) as Promise<PedidoDetail>
  },

  // Actualizar pedido general (admin)
  update: async (id_pedido: number, payload: UpdatePedidoPayload) => {
    return ApiBackend.put(`${base}/${id_pedido}`, payload) as Promise<PedidoDetail>
  },

  // Eliminar pedido (admin - solo pendientes/cancelados)
  delete: async (id_pedido: number) => {
    return ApiBackend.delete(`${base}/${id_pedido}`)
  },
}

export default pedidosService
