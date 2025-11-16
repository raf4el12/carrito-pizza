import { z } from 'zod'

export const sizeCreateSchema = z.object({
  nombre: z.string().min(1, 'El nombre del tamaño es obligatorio'),
  descripcion: z.string().nullish(), 
  precio_base: z.number().min(0, 'El precio base del tamaño es obligatorio'),
  activo: z.boolean().optional().default(true),
})

export const sizeUpdateSchema = z.object({
  nombre: z.string().min(1).optional(),
  descripcion: z.string().nullish(),
  precio_base: z.number().min(0).optional(),
  activo: z.boolean().optional(),
})

export type SizeCreateDto = z.infer<typeof sizeCreateSchema>
export type SizeUpdateDto = z.infer<typeof sizeUpdateSchema>

export const sizeStatus = {
  ACTIVO: 'activo',
  INACTIVO: 'inactivo',
} as const
export type SizeStatus = (typeof sizeStatus)[keyof typeof sizeStatus]

export interface Size {
  id_tamano: number
  nombre: string
  descripcion: string | null
  precio_base: number
  activo: boolean
}

export interface SizeListItem {
  id_tamano: number
  nombre: string
  activo: boolean
}

export type CreateSizeInput = SizeCreateDto
export type UpdateSizeInput = SizeUpdateDto