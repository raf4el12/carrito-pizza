import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { IngredientCreateDto } from '../../types/ingredients/ingredients.schema'
import { toast } from 'react-hot-toast'
export const useIngredientsCreate = () => {
    const mutation = useMutation({
        mutationFn: async (data: IngredientCreateDto) => {
            const response = await ApiBackend.post('/ingredients', data)
            return response.data
        },
        onSuccess: () => {
            toast.success('Ingrediente creado correctamente')
        },
        onError: () => {
            toast.error('Error al crear el ingrediente')
        },
    })
    return mutation
}

export default useIngredientsCreate