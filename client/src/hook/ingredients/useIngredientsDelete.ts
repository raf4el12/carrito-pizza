import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import { toast } from 'react-hot-toast'
import type { Ingredient } from '../../types/ingredients/ingredients.schema'


export const useIngredientsDelete = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await ApiBackend.delete(`/ingredients/${id}`)
            return response.data as Ingredient
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingredients'] })
            toast.success('Ingrediente eliminado correctamente')
        },
        onError: () => {
            toast.error('Error al eliminar el ingrediente')
        },
    })
}

export default useIngredientsDelete