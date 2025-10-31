import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { User } from '../../types/user/user.schema'

export const useGetUserById = (userId?: string | null) => {
  const query = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null

      const data = await ApiBackend.get<User>(`/users/${userId}`)
      return data
    },
    enabled: !!userId,
  })

  return query
}
