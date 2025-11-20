import z from 'zod'

export const reviewStatusEnum = z.enum(['pendiente', 'aprobado', 'rechazado', 'oculto'])

export const reviewCreateSchema = z.object({
  id_producto: z
    .number({ invalid_type_error: 'El producto es obligatorio' })
    .int('El producto debe ser un número entero')
    .positive('El producto debe ser un número positivo'),
  id_cliente: z
    .number({ invalid_type_error: 'El cliente es obligatorio' })
    .int('El cliente debe ser un número entero')
    .positive('El cliente debe ser un número positivo'),
  rating: z
    .number({ invalid_type_error: 'La calificación es obligatoria' })
    .int('La calificación debe ser un entero')
    .min(1, 'La calificación mínima es 1')
    .max(5, 'La calificación máxima es 5'),
  titulo: z
    .string()
    .max(150, 'El título no puede exceder 150 caracteres')
    .optional()
    .nullable(),
  comentario: z
    .string()
    .min(1, 'El comentario es obligatorio'),
  respuesta_admin: z.string().optional().nullable(),
  estado: reviewStatusEnum.optional(),
  visible: z.boolean().optional(),
})

export const reviewUpdateSchema = z.object({
  id_producto: z
    .number({ invalid_type_error: 'El producto es inválido' })
    .int('El producto debe ser entero')
    .positive('El producto debe ser positivo')
    .optional(),
  id_cliente: z
    .number({ invalid_type_error: 'El cliente es inválido' })
    .int('El cliente debe ser entero')
    .positive('El cliente debe ser positivo')
    .optional(),
  rating: z
    .number({ invalid_type_error: 'La calificación es inválida' })
    .int('La calificación debe ser un entero')
    .min(1, 'La calificación mínima es 1')
    .max(5, 'La calificación máxima es 5')
    .optional(),
  titulo: z.string().max(150, 'El título no puede exceder 150 caracteres').optional().nullable(),
  comentario: z.string().min(1, 'El comentario es obligatorio').optional(),
  respuesta_admin: z.string().optional().nullable(),
  estado: reviewStatusEnum.optional(),
  visible: z.boolean().optional(),
})

export type ReviewCreateDto = z.infer<typeof reviewCreateSchema>
export type ReviewUpdateDto = z.infer<typeof reviewUpdateSchema>
export type ReviewStatus = z.infer<typeof reviewStatusEnum>

export interface ReviewProductSummary {
  id_producto: number
  nombre: string
  imagen_url: string | null
}

export interface ReviewClientSummary {
  id_usuario: number
  nombre: string
  apellido: string
  email: string
}

export interface Review {
  id_resena: number
  id_producto: number
  id_cliente: number
  rating: number
  titulo: string | null
  comentario: string
  respuesta_admin: string | null
  estado: ReviewStatus
  visible: boolean
  created_at: string
  updated_at: string
  Producto?: ReviewProductSummary
  Cliente?: ReviewClientSummary
}

export interface ReviewFilters {
  status?: ReviewStatus | 'todas'
  productId?: number
  clientId?: number
  visible?: boolean
  search?: string
}
