import bcrypt from 'bcrypt'

import prisma from '../../prisma/context.js'
import { UnauthorizedError } from '../shared/shared.http.error.js'
import { createdUsuario } from '../modules/users/user.usecase.js'
import {
  getAccessToken,
  getRefreshToken,
  validRefreshToken,
} from './auth.credential.js'

const messageError = 'Credenciales no validas'

const login = async (email, password) => {
  const usuario = await prisma.usuarios.findUnique({
    where: {
      email,
      activo: true,
    },
  })

  if (!usuario) throw new UnauthorizedError(messageError)

  const valid = await bcrypt.compare(password, usuario.contraseña_encriptada)
  if (!valid) throw new UnauthorizedError(messageError)

  return {
    userId: usuario.id_usuario,
    email: usuario.email,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    username: usuario.username,
    rol: usuario.rol,
    accessToken: getAccessToken(usuario),
    refreshToken: getRefreshToken(usuario),
  }
}

const refreshToken = async (refreshToken) => {
  const payload = validRefreshToken(refreshToken)
  if (!payload) throw new UnauthorizedError(messageError)

  const usuario = await prisma.usuarios.findUnique({
    where: {
      id_usuario: payload.userId,
      activo: true,
    },
  })

  if (!usuario) throw new UnauthorizedError(messageError)

  return {
    accessToken: getAccessToken(usuario),
    refreshToken: getRefreshToken(usuario),
    userId: usuario.id_usuario,
  }
}

const signup = async (data) => {
  await createdUsuario(data)
}

export { login, refreshToken, signup }
