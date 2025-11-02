import z from 'zod'

export const userCreateSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').max(100, 'El nombre no puede exceder 100 caracteres'),
  apellido: z.string().min(1, 'El apellido es obligatorio').max(100, 'El apellido no puede exceder 100 caracteres'),
  email: z.string().email('El email no es válido').min(1, 'El email es obligatorio'),
  username: z.string().min(1, 'El username es obligatorio').max(255, 'El username no puede exceder 255 caracteres'),
  contraseña: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  telefono: z.string().max(20, 'El teléfono no puede exceder 20 caracteres').optional().nullable(),
  direccion: z.string().max(255, 'La dirección no puede exceder 255 caracteres').optional().nullable(),
  rol: z.enum(['cliente', 'administrador', 'repartidor']).optional(),
})

export const userUpdateSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').max(100, 'El nombre no puede exceder 100 caracteres').optional(),
  apellido: z.string().min(1, 'El apellido es obligatorio').max(100, 'El apellido no puede exceder 100 caracteres').optional(),
  email: z.string().email('El email no es válido').optional(),
  username: z.string().min(1, 'El username es obligatorio').max(255, 'El username no puede exceder 255 caracteres').optional(),
  contraseña: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional(),
  telefono: z.string().max(20, 'El teléfono no puede exceder 20 caracteres').optional().nullable(),
  direccion: z.string().max(255, 'La dirección no puede exceder 255 caracteres').optional().nullable(),
  rol: z.enum(['cliente', 'administrador', 'repartidor']).optional(),
  activo: z.boolean().optional(),
})

export type UserCreateDto = z.infer<typeof userCreateSchema>
export type UserUpdateDto = z.infer<typeof userUpdateSchema>

export interface User {
  id_usuario: number
  nombre: string
  apellido: string
  email: string
  username: string
  telefono: string | null
  direccion: string | null
  rol: 'cliente' | 'administrador' | 'repartidor'
  fecha_registro: string
  activo: boolean
}

export enum Role {
  CLIENTE = 'cliente',
  ADMINISTRADOR = 'administrador',
  REPARTIDOR = 'repartidor',
}

// Respuesta del login con tokens
export interface LoginResponse {
  userId: number
  email: string
  nombre: string
  apellido: string
  username: string
  rol: 'cliente' | 'administrador' | 'repartidor'
}
