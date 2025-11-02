import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'

import type { UserCreateDto, User } from '../../types/user/user.schema'

export const useUsersCreate = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: UserCreateDto) => {
            const response = await ApiBackend.post<User>('/users', data)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success('Usuario creado correctamente')
        },
        onError: () => {
            toast.error('Ocurrió un error al crear el usuario')
        },
    })
}
export default useUsersCreate
