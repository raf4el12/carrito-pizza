import { useQuery } from '@tanstack/react-query'
import pedidosService from '../../shared/services/pedidos.service'

export const PEDIDOS_QUERY_KEY = 'pedidos'

interface UsePedidosOptions {
  estado_pedido?: string
  estado_pago?: string
}

export const usePedidos = (options?: UsePedidosOptions) => {
  return useQuery({
    queryKey: [PEDIDOS_QUERY_KEY, options],
    queryFn: () => pedidosService.listAll(options),
  })
}

export default usePedidos
