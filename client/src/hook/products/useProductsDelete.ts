import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import type { Product } from '../../types/products/products.schema'

export const useProductsDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await ApiBackend.delete(`/products/${id}`)
      return response.data as Product
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Producto eliminado correctamente')
    },
    onError: () => {
      toast.error('Ocurrió un error al eliminar el producto')
    },
  })
}

export default useProductsDelete
