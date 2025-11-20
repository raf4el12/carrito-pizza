import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import type { MasaType } from '../../types/masa-types/masa-types.schema'

export const useMasaTypesDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => ApiBackend.delete<MasaType>(`/masa-types/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['masa-types'] })
      toast.success('Tipo de masa eliminado correctamente')
    },
    onError: () => {
      toast.error('Error al eliminar el tipo de masa')
    },
  })
}

export default useMasaTypesDelete

