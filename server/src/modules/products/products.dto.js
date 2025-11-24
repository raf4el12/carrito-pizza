export const ProductDTO = {
  id_producto: true,
  id_categoria: true,
  nombre: true,
  descripcion: true,
  imagen_url: true,
  precio_base: true,
  estado: true,
  fecha_creacion: true,
  Categoria: { 
    select: { 
      id_categoria: true, 
      nombre_categoria: true,
      descripcion: true 
    } 
  },
}

export const ProductListDTO = {
  id_producto: true,
  nombre: true,
  estado: true,
  imagen_url: true,
  Categoria: { 
    select: { 
      nombre_categoria: true 
    } 
  },
}


