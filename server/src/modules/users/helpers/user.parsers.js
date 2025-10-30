export const parseUserId = (id) => Number.parseInt(id, 10)

export const sanitizeUserData = (data) => {
  return {
    ...data,
    telefono: data.telefono || null,
    direccion: data.direccion || null,
  }
}