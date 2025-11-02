import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import type { User } from '../../types/user/user.schema'

export const useUsersDelete = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await ApiBackend.delete(`/users/${id}`)
            return response.data as User
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success('Usuario eliminado correctamente')
        },
        onError: () => {
            toast.error('Ocurrió un error al eliminar el usuario')
        },
    })
}
export default useUsersDelete
