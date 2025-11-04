import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Product } from '../../types/products/products.schema'

export const useProducts = () => {
  const dataQuery = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const data = await ApiBackend.get('/products')
      return data as Product[]
    },
  })
  return dataQuery
}

export default useProducts
