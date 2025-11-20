import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { MasaType } from '../../types/masa-types/masa-types.schema'

export const useMasaTypesById = (id: string | number | null) => {
  return useQuery<MasaType | null>({
    queryKey: ['masa-types', id],
    enabled: id !== null,
    queryFn: () => {
      if (id === null) return Promise.resolve(null)
      return ApiBackend.get<MasaType>(`/masa-types/${id}`)
    },
  })
}

export default useMasaTypesById

