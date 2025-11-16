import { useMutation, useQueryClient } from "@tanstack/react-query"
import ApiBackend from "../../shared/services/api.backend"
import { toast } from "react-hot-toast"
import type { SizeUpdateDto, Size } from "../../types/sizes/sizes.schema"

export const useSizesUpdate = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: SizeUpdateDto }) => {
            const response = await ApiBackend.put<Size>(`/sizes/${id}`, data)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sizes'] })
            toast.success('Tamaño actualizado correctamente')
        },
        onError: () => {
            toast.error('Error al actualizar el tamaño')
        },
    })
}
export default useSizesUpdate
