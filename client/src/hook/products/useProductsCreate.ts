import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import type { ProductCreateDto, Product } from '../../types/products/products.schema'

export const useProductsCreate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: ProductCreateDto) => {
      const response = await ApiBackend.post<Product>('/products', data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Producto creado correctamente')
    },
    onError: () => {
      toast.error('Ocurrió un error al crear el producto')
    },
  })
}

export default useProductsCreate
