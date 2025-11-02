import ApiBackend from '../../shared/services/api.backend'
import type { User } from '../../types/user/user.schema'

import { useQuery } from '@tanstack/react-query'

export const useUsers = () => {
    const dataQuery = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const data = await ApiBackend.get('/users')
            return data as User[]
        },
    })
    return dataQuery
}
