import z from 'zod'

export const productCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre del producto es obligatorio')
    .max(255, 'El nombre del producto no puede exceder 255 caracteres'),
  descripcion: z.string().optional().nullable(),
  id_categoria: z
    .number({ invalid_type_error: 'La categoría es obligatoria' })
    .int('La categoría debe ser un número entero')
    .positive('La categoría debe ser un número positivo'),
  imagen_url: z
    .string()
    .max(255, 'La URL de la imagen no puede exceder 255 caracteres')
    .optional()
    .nullable(),
  estado: z.enum(['activo', 'inactivo']).optional(),
})


export const productUpdateSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre del producto es obligatorio')
    .max(255, 'El nombre del producto no puede exceder 255 caracteres')
    .optional(),
  descripcion: z.string().optional().nullable(),
  id_categoria: z
    .number({ invalid_type_error: 'La categoría debe ser un número' })
    .int('La categoría debe ser un número entero')
    .positive('La categoría debe ser un número positivo')
    .optional(),
  imagen_url: z
    .string()
    .max(255, 'La URL de la imagen no puede exceder 255 caracteres')
    .optional()
    .nullable(),
  estado: z.enum(['activo', 'inactivo']).optional(),
})


export type ProductCreateDto = z.infer<typeof productCreateSchema>
export type ProductUpdateDto = z.infer<typeof productUpdateSchema>

export enum ProductStatus {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

export interface Product {
  id_producto: number
  id_categoria: number
  nombre: string
  descripcion: string | null
  imagen_url: string | null
  precio?: string | number // Added optional price
  estado: 'activo' | 'inactivo'
  fecha_creacion: string
  Categoria?: {
    id_categoria: number
    nombre_categoria: string
    descripcion: string | null
  }
}


export interface ProductListItem {
  id_producto: number
  nombre: string
  estado: 'activo' | 'inactivo'
  imagen_url: string | null
  Categoria?: {
    nombre_categoria: string
  }
}
