import { useMutation, useQueryClient } from "@tanstack/react-query"
import ApiBackend from "../../shared/services/api.backend"
import { toast } from "react-hot-toast"
import type { Size } from "../../types/sizes/sizes.schema"

export const useSizesDelete = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await ApiBackend.delete(`/sizes/${id}`)
            return response.data as Size
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sizes'] })
            toast.success('Tamaño eliminado correctamente')
        },
        onError: () => {
            toast.error('Error al eliminar el tamaño')
        },
    })
}
export default useSizesDelete