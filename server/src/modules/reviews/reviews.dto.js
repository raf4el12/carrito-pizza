export const ReviewBaseSelect = {
  id_resena: true,
  id_producto: true,
  id_cliente: true,
  rating: true,
  titulo: true,
  comentario: true,
  respuesta_admin: true,
  estado: true,
  visible: true,
  created_at: true,
  updated_at: true,
  Producto: {
    select: {
      id_producto: true,
      nombre: true,
      imagen_url: true,
    },
  },
  Cliente: {
    select: {
      id_usuario: true,
      nombre: true,
      apellido: true,
      email: true,
    },
  },
}

export const ReviewDTO = ReviewBaseSelect
export const ReviewListDTO = ReviewBaseSelect
