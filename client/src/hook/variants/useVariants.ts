import { useQuery } from '@tanstack/react-query'
import variantsService from '../../shared/services/variants.service'
import type { Variant } from '../../types/variants/variants.schema'

export const useVariants = () => {
  return useQuery<Variant[]>({
    queryKey: ['variants'],
    queryFn: () => variantsService.list(),
  })
}

export default useVariants
