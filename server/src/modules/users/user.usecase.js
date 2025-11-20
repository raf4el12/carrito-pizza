import bcrypt from 'bcrypt'
import prisma from '../../../prisma/context.js'
import { HttpError } from '../../shared/shared.http.error.js'
import { UsuarioPublicoDTO } from './user.dto.js'
import { validateRole, validateRequiredFields } from './helpers/user.validator.js'
import { checkUserExists, checkEmailUnique, checkUsernameUnique } from './helpers/user.checkers.js'
import { parseUserId } from './helpers/user.parsers.js'

const SALT_ROUNDS = 10

const createdUsuario = async (data) => {
  const { nombre, apellido, email, username, contraseña, telefono, direccion, rol = 'cliente' } = data

  validateRequiredFields(data)
  const resolvedRole = validateRole(rol) || 'cliente'

  await checkEmailUnique(email)
  await checkUsernameUnique(username)

  const contraseña_encriptada = await bcrypt.hash(contraseña, SALT_ROUNDS)

  return await prisma.usuarios.create({
    data: {
      nombre,
      apellido,
      email,
      username,
      contraseña_encriptada,
      telefono: telefono || null,
      direccion: direccion || null,
      rol: resolvedRole,
      activo: true,
    },
    select: UsuarioPublicoDTO,
  })
}

const getUsuarios = async () => {
  return await prisma.usuarios.findMany({
    where: { deleted_at: null },
    orderBy: { fecha_registro: 'desc' },
    select: UsuarioPublicoDTO, 
  })
}

const getUsuarioById = async (id) => {
  const usuario = await prisma.usuarios.findFirst({
    where: {
      id_usuario: parseUserId(id),
      deleted_at: null,
    },
    select: UsuarioPublicoDTO, 
  })

  if (!usuario) {
    throw new HttpError('Usuario no encontrado', 404)
  }

  return usuario
}

const updateUsuarioById = async (id, data) => {
  const {
    nombre,
    apellido,
    email,
    username,
    contraseña,
    telefono,
    direccion,
    rol,
    activo,
  } = data

  const usuarioExistente = await checkUserExists(id)

  const updatePayload = {}

  if (nombre !== undefined) updatePayload.nombre = nombre
  if (apellido !== undefined) updatePayload.apellido = apellido
  if (telefono !== undefined) updatePayload.telefono = telefono || null
  if (direccion !== undefined) updatePayload.direccion = direccion || null
  if (typeof activo === 'boolean') updatePayload.activo = activo

  if (email && email !== usuarioExistente.email) {
    await checkEmailUnique(email, id)
    updatePayload.email = email
  }

  if (username && username !== usuarioExistente.username) {
    await checkUsernameUnique(username, id)
    updatePayload.username = username
  }

  if (contraseña) {
    updatePayload.contraseña_encriptada = await bcrypt.hash(contraseña, SALT_ROUNDS)
  }

  if (rol) {
    updatePayload.rol = validateRole(rol)
  }

  return await prisma.usuarios.update({
    where: { id_usuario: parseUserId(id) },
    data: updatePayload,
    select: UsuarioPublicoDTO, 
  })
}

const deleteUsuarioById = async (id) => {
  await checkUserExists(id)

  return await prisma.usuarios.update({
    where: { id_usuario: parseUserId(id) },
    data: { activo: false, deleted_at: new Date() },
    select: UsuarioPublicoDTO, 
  })
}

export {
  createdUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuarioById,
  deleteUsuarioById,
}
