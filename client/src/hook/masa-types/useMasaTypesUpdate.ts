import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import type {
  MasaType,
  MasaTypeUpdateDto,
} from '../../types/masa-types/masa-types.schema'

export const useMasaTypesUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: MasaTypeUpdateDto }) => {
      const response = await ApiBackend.put<MasaType>(`/masa-types/${id}`, data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['masa-types'] })
      toast.success('Tipo de masa actualizado correctamente')
    },
    onError: () => {
      toast.error('Error al actualizar el tipo de masa')
    },
  })
}

export default useMasaTypesUpdate

