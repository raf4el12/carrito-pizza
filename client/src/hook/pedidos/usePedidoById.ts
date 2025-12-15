import { useQuery } from '@tanstack/react-query'
import pedidosService from '../../shared/services/pedidos.service'
import { PEDIDOS_QUERY_KEY } from './usePedidos'

export const usePedidoById = (id_pedido: number | null) => {
  return useQuery({
    queryKey: [PEDIDOS_QUERY_KEY, id_pedido],
    queryFn: () => pedidosService.getById(id_pedido!),
    enabled: !!id_pedido,
  })
}

export default usePedidoById
