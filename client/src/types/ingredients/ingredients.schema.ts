import z from 'zod'

export const ingredientCreateSchema = z.object({
    nombre: z.string().min(1, 'El nombre del ingrediente es obligatorio'),
    precio_adicional: z.number().min(0, 'El precio del ingrediente es obligatorio'),
    stock_disponible: z.number().min(0, 'El stock del ingrediente es obligatorio'),
    activo: z.boolean().optional(),
})

export const ingredientUpdateSchema = z.object({
    nombre: z.string().min(1, 'El nombre del ingrediente es obligatorio').optional(),
    precio_adicional: z.number().min(0, 'El precio del ingrediente es obligatorio').optional(),
    stock_disponible: z.number().min(0, 'El stock del ingrediente es obligatorio').optional(),
    activo: z.boolean().optional(),
})

export type IngredientCreateDto = z.infer<typeof ingredientCreateSchema>
export type IngredientUpdateDto = z.infer<typeof ingredientUpdateSchema>

export enum IngredientStatus {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo',
}

export interface Ingredient {
    id_ingrediente: number
    nombre: string
    precio_adicional: number
    stock_disponible: number
    activo: boolean
}

export interface IngredientListItem {
    id_ingrediente: number
    nombre: string
    activo: boolean
}