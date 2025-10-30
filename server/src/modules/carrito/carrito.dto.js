export const CarritoItemDTO = {
  id_carrito: true,
  id_cliente: true,
  id_variante: true,
  cantidad: true,
  fecha_adicion: true,
  Variante: {
    select: {
      id_variante: true,
      precio_base: true,
      Producto: { select: { nombre: true, imagen_url: true } },
      Tamano: { select: { nombre: true } },
      Tipo_Masa: { select: { nombre: true } },
    },
  },
  Ingredientes: {
    select: {
      id_ingrediente: true,
      accion: true,
      posicion: true,
      Ingrediente: { select: { nombre: true, precio_adicional: true } },
    },
  },
}
  
  export const CarritoSimpleDTO = {
    id_carrito: true,
    id_cliente: true,
    cantidad: true,
    fecha_adicion: true,
  }