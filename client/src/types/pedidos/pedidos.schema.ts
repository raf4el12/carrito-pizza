import { z } from 'zod'
import { cartItemSchema } from '../cart/cart.schema'

// Cliente info en pedidos
export const clienteInfoSchema = z.object({
  id_usuario: z.number(),
  nombre: z.string(),
  apellido: z.string(),
  email: z.string().optional(),
  telefono: z.string().nullable().optional(),
})

// Repartidor info en pedidos
export const repartidorInfoSchema = z.object({
  id_usuario: z.number(),
  nombre: z.string(),
  apellido: z.string(),
  telefono: z.string().nullable().optional(),
})

export const pedidoListItemSchema = z.object({
  id_pedido: z.number(),
  id_cliente: z.number(),
  fecha_pedido: z.string(),
  estado_pedido: z.string(),
  total_pedido: z.number().or(z.string()),
  direccion_entrega: z.string().nullable().optional(),
  estado_pago: z.string().nullable().optional(),
  metodo_pago: z.string().nullable().optional(),
  fecha_entrega_estimada: z.string().nullable().optional(),
  Cliente: clienteInfoSchema.optional(),
  Repartidor: repartidorInfoSchema.nullable().optional(),
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
  Cliente: clienteInfoSchema.optional(),
  Repartidor: repartidorInfoSchema.nullable().optional(),
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

export type UpdatePedidoPayload = {
  estado_pedido?: string
  estado_pago?: string
  direccion_entrega?: string
  notas_cliente?: string
  id_repartidor?: number | null
  fecha_entrega_estimada?: string | null
}

// Estados de pedido
export const ORDER_STATUSES = [
  { value: 'pendiente', label: 'Pendiente', color: 'warning' },
  { value: 'aceptado', label: 'Aceptado', color: 'info' },
  { value: 'en_camino', label: 'En Camino', color: 'primary' },
  { value: 'entregado', label: 'Entregado', color: 'success' },
  { value: 'cancelado', label: 'Cancelado', color: 'error' },
] as const

// Estados de pago
export const PAYMENT_STATUSES = [
  { value: 'pendiente', label: 'Pendiente', color: 'warning' },
  { value: 'pagado', label: 'Pagado', color: 'success' },
  { value: 'fallido', label: 'Fallido', color: 'error' },
  { value: 'reembolsado', label: 'Reembolsado', color: 'info' },
] as const

// Métodos de pago
export const PAYMENT_METHODS = [
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'tarjeta', label: 'Tarjeta' },
  { value: 'billetera_virtual', label: 'Billetera Virtual' },
] as const
