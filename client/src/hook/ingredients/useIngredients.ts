import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Ingredient } from '../../types/ingredients/ingredients.schema'

export const useIngredients = () => {
    const dataQuery = useQuery({
        queryKey: ['ingredients'],
        queryFn: async () => {
            const data = await ApiBackend.get('/ingredients')
            return data as Ingredient[]
        },
    })
    return dataQuery
}

export default useIngredients
