import { z } from 'zod'

export const variantSchema = z.object({
  id_variante: z.number(),
  id_producto: z.number(),
  id_tamano: z.number().nullable().optional(),
  id_tipo_masa: z.number().nullable().optional(),
  precio_base: z.number().or(z.string()),
  sku: z.string().nullable().optional(),
  activo: z.boolean().optional(),
  Producto: z
    .object({
      id_producto: z.number(),
      nombre: z.string(),
    })
    .optional(),
  Tamano: z
    .object({ id_tamano: z.number(), nombre: z.string().nullable().optional(), precio_base: z.number().or(z.string()).nullable().optional() })
    .optional(),
  Tipo_Masa: z
    .object({ id_tipo_masa: z.number(), nombre: z.string().nullable().optional() })
    .optional(),
})

export type Variant = z.infer<typeof variantSchema>
export type VariantList = Variant[]
