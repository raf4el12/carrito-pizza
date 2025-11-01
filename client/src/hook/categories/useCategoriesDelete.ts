import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import type { Category } from '../../types/categories/categories.schema'

export const useCategoriesDelete = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await ApiBackend.delete(`/categories/${id}`)
            return response.data as Category
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            toast.success('Categoría eliminada correctamente')
        },
        onError: () => {
            toast.error('Ocurrió un error al eliminar la categoría')
        },
    })
}
export default useCategoriesDelete