import { useQuery } from "@tanstack/react-query"
import ApiBackend from "../../shared/services/api.backend"
import type { Size } from "../../types/sizes/sizes.schema"

export const useSizesById = (id: string) => {
    const dataQuery = useQuery({
        queryKey: ['sizes', id],
        queryFn: async () => {
            const data = await ApiBackend.get(`/sizes/${id}`)
            return data as Size
        },
    })
    return dataQuery
}
export default useSizesById
