import { useCallback, useState } from 'react'
import { usePedidos } from '../../../hook/pedidos/usePedidos'
import { usePedidoUpdateEstado } from '../../../hook/pedidos/usePedidoUpdateEstado'
import { usePedidoUpdateRepartidor } from '../../../hook/pedidos/usePedidoUpdateRepartidor'
import { usePedidoDelete } from '../../../hook/pedidos/usePedidoDelete'
import type { PedidoListItem } from '../../../types/pedidos/pedidos.schema'
import toast from 'react-hot-toast'

type ActiveView = 'list' | 'detail'

interface Filters {
  estado_pedido?: string
  estado_pago?: string
}

export const useOrdersListHook = () => {
  const [filters, setFilters] = useState<Filters>({})
  const [activeView, setActiveView] = useState<ActiveView>('list')
  const [selectedOrder, setSelectedOrder] = useState<PedidoListItem | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<PedidoListItem | null>(null)

  const { data: orders, isLoading, error, refetch } = usePedidos(filters)
  const updateEstadoMutation = usePedidoUpdateEstado()
  const updateRepartidorMutation = usePedidoUpdateRepartidor()
  const deleteMutation = usePedidoDelete()

  const hasOrders = orders && orders.length > 0

  const handleView = useCallback((order: PedidoListItem) => {
    setSelectedOrder(order)
    setActiveView('detail')
  }, [])

  const handleBackToList = useCallback(() => {
    setSelectedOrder(null)
    setActiveView('list')
  }, [])

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters({})
  }, [])

  const handleUpdateEstado = useCallback(
    async (id_pedido: number, estado_pedido: string) => {
      try {
        await updateEstadoMutation.mutateAsync({ id_pedido, estado_pedido })
        toast.success('Estado actualizado correctamente')
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al actualizar estado'
        toast.error(errorMessage)
      }
    },
    [updateEstadoMutation]
  )

  const handleUpdateRepartidor = useCallback(
    async (id_pedido: number, id_repartidor: number | null) => {
      try {
        await updateRepartidorMutation.mutateAsync({ id_pedido, id_repartidor })
        toast.success('Repartidor asignado correctamente')
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al asignar repartidor'
        toast.error(errorMessage)
      }
    },
    [updateRepartidorMutation]
  )

  const handleDelete = useCallback((order: PedidoListItem) => {
    setOrderToDelete(order)
    setIsDeleteDialogOpen(true)
  }, [])

  const handleDeleteDialogClose = useCallback(() => {
    setIsDeleteDialogOpen(false)
    setOrderToDelete(null)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    if (!orderToDelete) return
    try {
      await deleteMutation.mutateAsync(orderToDelete.id_pedido)
      toast.success('Pedido eliminado correctamente')
      handleDeleteDialogClose()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar pedido'
      toast.error(errorMessage)
    }
  }, [deleteMutation, orderToDelete, handleDeleteDialogClose])

  return {
    orders,
    isLoading,
    error,
    hasOrders,
    filters,
    activeView,
    selectedOrder,
    isDeleteDialogOpen,
    isUpdating: updateEstadoMutation.isPending || updateRepartidorMutation.isPending,
    isDeleting: deleteMutation.isPending,
    handleView,
    handleBackToList,
    handleFilterChange,
    handleClearFilters,
    handleUpdateEstado,
    handleUpdateRepartidor,
    handleDelete,
    handleDeleteDialogClose,
    handleDeleteConfirm,
    refetch,
  }
}

export type UseOrdersListHookReturn = ReturnType<typeof useOrdersListHook>
