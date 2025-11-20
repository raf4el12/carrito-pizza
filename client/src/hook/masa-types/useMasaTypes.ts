import ApiBackend from '../../shared/services/api.backend'
import type { MasaType } from '../../types/masa-types/masa-types.schema'

import { useQuery } from '@tanstack/react-query'

export const useMasaTypes = () => {
  const dataQuery = useQuery({
    queryKey: ['masa-types'],
    queryFn: async () => {
      const data = await ApiBackend.get('/masa-types')
      return data as MasaType[]
    },
  })
  return dataQuery
}

