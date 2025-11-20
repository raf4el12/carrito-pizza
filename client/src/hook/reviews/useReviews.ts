import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Review, ReviewFilters } from '../../types/reviews/reviews.schema'

const buildQueryString = (filters?: ReviewFilters) => {
  if (!filters) return ''
  const params = new URLSearchParams()

  if (filters.status && filters.status !== 'todas') {
    params.append('status', filters.status)
  }

  if (filters.productId) {
    params.append('productId', String(filters.productId))
  }

  if (filters.clientId) {
    params.append('clientId', String(filters.clientId))
  }

  if (filters.visible !== undefined) {
    params.append('visible', String(filters.visible))
  }

  if (filters.search) {
    params.append('search', filters.search)
  }

  const query = params.toString()
  return query ? `?${query}` : ''
}

export const useReviews = (filters?: ReviewFilters) => {
  const queryString = useMemo(() => buildQueryString(filters), [filters])

  return useQuery({
    queryKey: ['reviews', filters],
    queryFn: async () => {
      const data = await ApiBackend.get<Review[]>(`/reviews${queryString}`)
      return data
    },
  })
}

export default useReviews
