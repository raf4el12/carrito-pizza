import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { User } from '../../types/user/user.schema'

export const useUsersById = (id: number) => {
    const dataQuery = useQuery({
        queryKey: ['users', id],
        queryFn: async () => {
            const data = await ApiBackend.get(`/users/${id}`)
            return data as User
        },
    })
    return dataQuery
}
