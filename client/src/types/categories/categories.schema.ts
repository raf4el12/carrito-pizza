import z from 'zod'

export const categoryCreateSchema = z.object({
  nombre_categoria: z
    .string()
    .min(1, 'El nombre de la categoría es obligatorio')
    .max(100, 'El nombre de la categoría no puede exceder 100 caracteres'),
  descripcion: z.string().optional().nullable(),
})

export const categoryUpdateSchema = z.object({
  nombre_categoria: z
    .string()
    .min(1, 'El nombre de la categoría es obligatorio')
    .max(100, 'El nombre de la categoría no puede exceder 100 caracteres')
    .optional(),
  descripcion: z.string().optional().nullable(),
})

export type CategoryCreateDto = z.infer<typeof categoryCreateSchema>
export type CategoryUpdateDto = z.infer<typeof categoryUpdateSchema>

export interface Category {
  id_categoria: number
  nombre_categoria: string
  descripcion: string | null
}

export interface CategoryListItem {
  id_categoria: number
  nombre_categoria: string
}