import { useMutation, useQueryClient } from '@tanstack/react-query'
import pedidosService from '../../shared/services/pedidos.service'
import { PEDIDOS_QUERY_KEY } from './usePedidos'

interface UpdateRepartidorParams {
  id_pedido: number
  id_repartidor: number | null
}

export const usePedidoUpdateRepartidor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id_pedido, id_repartidor }: UpdateRepartidorParams) =>
      pedidosService.updateRepartidor(id_pedido, id_repartidor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PEDIDOS_QUERY_KEY] })
    },
  })
}

export default usePedidoUpdateRepartidor
