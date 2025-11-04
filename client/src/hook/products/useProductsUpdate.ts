import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import type { ProductUpdateDto, Product } from '../../types/products/products.schema'

export const useProductsUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ProductUpdateDto }) => {
      const response = await ApiBackend.put<Product>(`/products/${id}`, data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Producto actualizado correctamente')
    },
    onError: () => {
      toast.error('Ocurrió un error al actualizar el producto')
    },
  })
}

export default useProductsUpdate
