import { useMutation, useQueryClient } from '@tanstack/react-query'
import pedidosService from '../../shared/services/pedidos.service'
import { PEDIDOS_QUERY_KEY } from './usePedidos'

export const usePedidoDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id_pedido: number) => pedidosService.delete(id_pedido),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PEDIDOS_QUERY_KEY] })
    },
  })
}

export default usePedidoDelete
