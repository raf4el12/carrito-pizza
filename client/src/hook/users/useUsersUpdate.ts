import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import type { UserUpdateDto, User } from '../../types/user/user.schema'

export const useUsersUpdate = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UserUpdateDto }) => {
            const response = await ApiBackend.put<User>(`/users/${id}`, data)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success('Usuario actualizado correctamente')
        },
        onError: () => {
            toast.error('Ocurrió un error al actualizar el usuario')
        },
    })
}
export default useUsersUpdate
