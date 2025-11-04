import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Product } from '../../types/products/products.schema'

export const useProductById = (id: number | null) => {
  const dataQuery = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) return null
      const data = await ApiBackend.get(`/products/${id}`)
      return data as Product
    },
    enabled: !!id,
  })
  return dataQuery
}

export default useProductById
