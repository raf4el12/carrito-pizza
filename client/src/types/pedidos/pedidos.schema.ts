import { z } from 'zod'
import { cartItemSchema } from '../cart/cart.schema'

export const pedidoListItemSchema = z.object({
  id_pedido: z.number(),
  id_cliente: z.number(),
  fecha_pedido: z.string(),
  estado_pedido: z.string(),
  total_pedido: z.number().or(z.string()),
  direccion_entrega: z.string().nullable().optional(),
  estado_pago: z.string().nullable().optional(),
  metodo_pago: z.string().nullable().optional(),
})

export const pedidoDetailSchema = z.object({
  id_pedido: z.number(),
  id_cliente: z.number(),
  fecha_pedido: z.string(),
  estado_pedido: z.string(),
  total_pedido: z.number().or(z.string()),
  direccion_entrega: z.string(),
  notas_cliente: z.string().nullable().optional(),
  id_repartidor: z.number().nullable().optional(),
  id_cupon_aplicado: z.number().nullable().optional(),
  descuento_aplicado: z.number().nullable().optional(),
  metodo_pago: z.string().nullable().optional(),
  estado_pago: z.string().nullable().optional(),
  fecha_entrega_estimada: z.string().nullable().optional(),
  Detalles: z.array(cartItemSchema).optional(),
})

export type PedidoListItem = z.infer<typeof pedidoListItemSchema>
export type PedidoDetail = z.infer<typeof pedidoDetailSchema>

export type CreatePedidoPayload = {
  id_cliente: number
  direccion_entrega: string
  metodo_pago: string
  id_cupon_aplicado?: number | null
  notas_cliente?: string | null
  fecha_entrega_estimada?: string | null
}
