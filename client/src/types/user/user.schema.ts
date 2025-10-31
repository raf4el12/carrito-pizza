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
