import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import type {
  MasaType,
  MasaTypeCreateDto,
} from '../../types/masa-types/masa-types.schema'

export const useMasaTypesCreate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: MasaTypeCreateDto) => {
      const response = await ApiBackend.post<MasaType>('/masa-types', data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['masa-types'] })
      toast.success('Tipo de masa creado correctamente')
    },
    onError: () => {
      toast.error('Error al crear el tipo de masa')
    },
  })
}

export default useMasaTypesCreate

