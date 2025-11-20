import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'

export const useReviewDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await ApiBackend.delete(`/reviews/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      toast.success('Reseña eliminada correctamente')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Ocurrió un error al eliminar la reseña')
    },
  })
}

export default useReviewDelete
