import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import { toast } from 'react-hot-toast'
import type { Ingredient, IngredientUpdateDto } from '../../types/ingredients/ingredients.schema'

export const useIngredientsUpdate = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: IngredientUpdateDto }) => {
            const response = await ApiBackend.put<Ingredient>(`/ingredients/${id}`, data)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingredients'] })
            toast.success('Ingrediente actualizado correctamente')
        },
        onError: () => {
            toast.error('Error al actualizar el ingrediente')
        },
    })
}

export default useIngredientsUpdate