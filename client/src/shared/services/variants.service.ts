import ApiBackend from './api.backend'
import { Variant } from '../../types/variants/variants.schema'

type CreateVariantPayload = {
  id_producto: number
  id_tamano: number
  id_tipo_masa?: number | null
  precio_base: number | string
  sku?: string | null
  activo?: boolean
}

const base = '/variants'

export const variantsService = {
  list: async () => {
    return ApiBackend.get(base) as Promise<Variant[]>
  },
  create: async (payload: CreateVariantPayload) => {
    return ApiBackend.post(base, payload) as Promise<Variant>
  },
}

export default variantsService
