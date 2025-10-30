import prisma from '../../../../prisma/context.js'
import { HttpError } from '../../../shared/shared.http.error.js'
import { parseUserId } from './user.parsers.js'

export const checkUserExists = async (id) => {
  const usuario = await prisma.usuarios.findUnique({
    where: { id_usuario: parseUserId(id) },
  })
  if (!usuario) {
    throw new HttpError('Usuario no encontrado', 404)
  }
  return usuario
}

export const checkEmailUnique = async (email, excludeId = null) => {
  const exists = await prisma.usuarios.findUnique({ where: { email } })
  if (exists && (!excludeId || exists.id_usuario !== parseUserId(excludeId))) {
    throw new HttpError('El email ya está registrado', 409)
  }
}

export const checkUsernameUnique = async (username, excludeId = null) => {
  const exists = await prisma.usuarios.findUnique({ where: { username } })
  if (exists && (!excludeId || exists.id_usuario !== parseUserId(excludeId))) {
    throw new HttpError('El username ya está registrado', 409)
  }
}