import z from 'zod'
import { Role } from '../user/user.schema'

export const userSignupSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  apellido: z.string().min(1, 'El apellido es obligatorio'),
  email: z.string().email('El email debe ser válido').min(1, 'El email es obligatorio'),
  username: z.string().min(3, 'El username debe tener al menos 3 caracteres'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  rol: z.nativeEnum(Role),
})

export type SignupDto = z.infer<typeof userSignupSchema>

export interface LoginDto {
  email: string
  password: string
}
