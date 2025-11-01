import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'

import type { CategoryCreateDto, Category } from '../../types/categories/categories.schema'

export const useCategoriesCreate = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: CategoryCreateDto) => {
            const response = await ApiBackend.post<Category>('/categories', data)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            toast.success('Categoría creada correctamente')
        },
        onError: () => {
            toast.error('Ocurrió un error al crear la categoría')
        },
    })
}
export default useCategoriesCreate