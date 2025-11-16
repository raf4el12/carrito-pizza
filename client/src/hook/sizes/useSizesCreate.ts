import { useMutation } from "@tanstack/react-query"
import ApiBackend from "../../shared/services/api.backend"
import type { SizeCreateDto } from "../../types/sizes/sizes.schema"
import { toast } from "react-hot-toast"

export const useSizesCreate = () => {
    const mutation = useMutation({
        mutationFn: async (data: SizeCreateDto) => {
            const response = await ApiBackend.post('/sizes', data)
            return response.data
        },
        onSuccess: () => {
            toast.success('Tamaño creado correctamente')
        },
        onError: () => {
            toast.error('Error al crear el tamaño')
        },
    })
    return mutation
}
export default useSizesCreate