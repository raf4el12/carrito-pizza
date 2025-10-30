export const VariantDTO = {
  id_variante: true,
  id_producto: true,
  id_tamano: true,
  id_tipo_masa: true,
  precio_base: true,
  sku: true,
  activo: true,
  Producto: { select: { id_producto: true, nombre: true } },
  Tamano: { select: { id_tamano: true, nombre: true } },
  Tipo_Masa: { select: { id_tipo_masa: true, nombre: true } },
}

