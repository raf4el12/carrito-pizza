import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import type { CategoryUpdateDto, Category } from '../../types/categories/categories.schema'

export const useCategoriesUpdate = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: CategoryUpdateDto }) => {
            const response = await ApiBackend.put<Category>(`/categories/${id}`, data)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            toast.success('Categoría actualizada correctamente')
        },
        onError: () => {
            toast.error('Ocurrió un error al actualizar la categoría')
        },
    })
}
export default useCategoriesUpdate