import { HttpError } from '../../../shared/shared.http.error.js'

export const ALLOWED_ROLES = ['cliente', 'administrador', 'repartidor']

export const validateRole = (rol) => {
  if (!rol) return undefined
  const normalizedRole = rol.trim().toLowerCase()
  if (!ALLOWED_ROLES.includes(normalizedRole)) {
    throw new HttpError(`Rol inválido. Roles permitidos: ${ALLOWED_ROLES.join(', ')}`, 400)
  }
  return normalizedRole
}

export const validateRequiredFields = (data) => {
  const { nombre, apellido, email, username, contraseña } = data
  if (!nombre || !apellido || !email || !username || !contraseña) {
    throw new HttpError('Todos los campos requeridos deben ser proporcionados', 400)
  }
}