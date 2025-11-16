import { useQuery } from "@tanstack/react-query"
import ApiBackend from "../../shared/services/api.backend"
import type { Size } from "../../types/sizes/sizes.schema"

export const useSizes = () => {
    const dataQuery = useQuery({
        queryKey: ['sizes'],
        queryFn: async () => {
            const data = await ApiBackend.get('/sizes')
            return data as Size[]
        },
    })
    return dataQuery
}

export default useSizes