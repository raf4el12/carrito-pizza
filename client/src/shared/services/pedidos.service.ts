import ApiBackend from './api.backend'
import { CreatePedidoPayload, PedidoDetail, PedidoListItem } from '../../types/pedidos/pedidos.schema'

const base = '/pedidos'

export const pedidosService = {
  create: async (payload: CreatePedidoPayload) => {
    return ApiBackend.post(base, payload) as Promise<PedidoDetail>
  },
  listByCliente: async (id_cliente: number) => {
    return ApiBackend.get(`${base}/cliente/${id_cliente}`) as Promise<PedidoListItem[]>
  },
  getById: async (id_pedido: number) => {
    return ApiBackend.get(`${base}/${id_pedido}`) as Promise<PedidoDetail>
  },
}

export default pedidosService
