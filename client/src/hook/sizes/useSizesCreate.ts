import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Size, SizeCreateDto } from '../../types/sizes/sizes.schema'
import { toast } from 'react-hot-toast'

export const useSizesCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: SizeCreateDto) => {
      const response = await ApiBackend.post<Size>('/sizes', data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] })
      toast.success('Tamaño creado correctamente')
    },
    onError: () => {
      toast.error('Error al crear el tamaño')
    },
  })
}
export default useSizesCreate