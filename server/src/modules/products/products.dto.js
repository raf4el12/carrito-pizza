export const ProductDTO = {
  id_producto: true,
  nombre: true,
  descripcion: true,
  imagen_url: true,
  estado: true,
  fecha_creacion: true,
  Categoria: { select: { id_categoria: true, nombre_categoria: true } },
}

export const ProductListDTO = {
  id_producto: true,
  nombre: true,
  estado: true,
  Categoria: { select: { nombre_categoria: true } },
}

