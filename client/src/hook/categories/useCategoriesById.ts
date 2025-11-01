import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Category } from '../../types/categories/categories.schema'

export const useCategoriesById = (id: number) => {
    const dataQuery = useQuery({
        queryKey: ['categories', id],
        queryFn: async () => {
            const data = await ApiBackend.get(`/categories/${id}`)
            return data as Category
        },
    })
    return dataQuery
}