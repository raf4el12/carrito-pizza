import z from 'zod'

export const masaTypeCreateSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
  descripcion: z
    .string()
    .max(255, 'Máximo 255 caracteres')
    .nullish(),
  precio_adicional: z
    .number({
      required_error: 'El precio adicional es obligatorio',
      invalid_type_error: 'El precio debe ser un número',
    })
    .min(0, 'El precio debe ser mayor o igual a 0'),
  activo: z.boolean().optional().default(true),
})

export const masaTypeUpdateSchema = z.object({
  nombre: z.string().min(1).max(100).optional(),
  descripcion: z.string().max(255).nullish(),
  precio_adicional: z.number().min(0).optional(),
  activo: z.boolean().optional(),
})

export type MasaTypeCreateDto = z.infer<typeof masaTypeCreateSchema>
export type MasaTypeUpdateDto = z.infer<typeof masaTypeUpdateSchema>

export interface MasaType {
  id_tipo_masa: number
  nombre: string
  descripcion: string | null
  precio_adicional: number
  activo: boolean
}

export interface MasaTypeListItem {
  id_tipo_masa: number
  nombre: string
  activo: boolean
}


