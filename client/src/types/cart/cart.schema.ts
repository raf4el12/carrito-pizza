import { z } from 'zod'

export const cartIngredientSchema = z.object({
  id_ingrediente: z.number(),
  accion: z.string().nullable().optional(),
  posicion: z.string().nullable().optional(),
  Ingrediente: z
    .object({
      nombre: z.string().nullable().optional(),
      precio_adicional: z.number().nullable().optional(),
    })
    .optional(),
})

export const cartVarianteSchema = z.object({
  id_variante: z.number(),
  precio_base: z.number().or(z.string()),
  Producto: z
    .object({
      id_producto: z.number(),
      nombre: z.string(),
      imagen_url: z.string().nullable().optional(),
    })
    .optional(),
  Tamano: z
    .object({ id_tamano: z.number(), nombre: z.string().nullable().optional() })
    .optional(),
  Tipo_Masa: z
    .object({ id_tipo_masa: z.number(), nombre: z.string().nullable().optional() })
    .optional(),
})

export const cartItemSchema = z.object({
  id_carrito: z.number(),
  id_cliente: z.number(),
  id_variante: z.number(),
  cantidad: z.number(),
  fecha_adicion: z.string(),
  Variante: cartVarianteSchema.optional(),
  Ingredientes: z.array(cartIngredientSchema).optional(),
  totals: z
    .object({
      unit: z.number().optional(),
      subtotal: z.number().optional(),
    })
    .optional(),
})

export const cartTotalsSchema = z.object({
  total: z.number().optional(),
})

export const cartResponseSchema = z.object({
  items: z.array(cartItemSchema),
  totals: cartTotalsSchema,
})

export type CartIngredient = z.infer<typeof cartIngredientSchema>
export type CartVariante = z.infer<typeof cartVarianteSchema>
export type CartItem = z.infer<typeof cartItemSchema>
export type CartTotals = z.infer<typeof cartTotalsSchema>
export type CartResponse = z.infer<typeof cartResponseSchema>

export type AddCartItemPayload = {
  id_cliente: number
  id_variante: number
  cantidad: number
  ingredientes?: { id_ingrediente: number; accion?: string; posicion?: string }[]
}

export type UpdateCartItemPayload = {
  cantidad: number
}
