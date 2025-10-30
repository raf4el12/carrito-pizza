
export const UsuarioPublicoDTO = {
    id_usuario: true,
    nombre: true,
    apellido: true,
    email: true,
    username: true,
    telefono: true,
    direccion: true,
    rol: true,
    fecha_registro: true,
    activo: true,
  }

  export const UsuarioListaDTO = {
    id_usuario: true,
    nombre: true,
    apellido: true,
    email: true,
    rol: true,
    activo: true,
  }

  export const UsuarioAuthDTO = {
    id_usuario: true,
    email: true,
    username: true,
    contraseña_encriptada: true,
    rol: true,
    activo: true,
  }