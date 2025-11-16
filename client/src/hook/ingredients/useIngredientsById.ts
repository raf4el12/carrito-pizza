import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Ingredient } from '../../types/ingredients/ingredients.schema'

export const useIngredientsById = (id: string) => {
    const dataQuery = useQuery({
        queryKey: ['ingredients', id],
        queryFn: async () => {
            const data = await ApiBackend.get(`/ingredients/${id}`)
            return data as Ingredient
        },
    })
    return dataQuery
}

export default useIngredientsById