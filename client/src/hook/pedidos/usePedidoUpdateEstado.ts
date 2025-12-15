import { useMutation, useQueryClient } from '@tanstack/react-query'
import pedidosService from '../../shared/services/pedidos.service'
import { PEDIDOS_QUERY_KEY } from './usePedidos'

interface UpdateEstadoParams {
  id_pedido: number
  estado_pedido: string
}

export const usePedidoUpdateEstado = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id_pedido, estado_pedido }: UpdateEstadoParams) =>
      pedidosService.updateEstado(id_pedido, estado_pedido),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PEDIDOS_QUERY_KEY] })
    },
  })
}

export default usePedidoUpdateEstado
