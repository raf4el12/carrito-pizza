export const PedidoDTO = {
  id_pedido: true,
  id_cliente: true,
  fecha_pedido: true,
  estado_pedido: true,
  total_pedido: true,
  direccion_entrega: true,
  notas_cliente: true,
  id_repartidor: true,
  id_cupon_aplicado: true,
  descuento_aplicado: true,
  metodo_pago: true,
  estado_pago: true,
  fecha_entrega_estimada: true,
  Cliente: {
    select: {
      id_usuario: true,
      nombre: true,
      apellido: true,
      email: true,
      telefono: true,
      direccion: true,
    },
  },
  Repartidor: {
    select: {
      id_usuario: true,
      nombre: true,
      apellido: true,
      telefono: true,
    },
  },
  Cupon: {
    select: {
      id_cupon: true,
      codigo: true,
      tipo_descuento: true,
      valor_descuento: true,
    },
  },
  Detalles: {
    select: {
      id_detalle_pedido: true,
      id_variante: true,
      cantidad: true,
      precio_base_unitario: true,
      precio_ingredientes_adicionales: true,
      subtotal: true,
      Variante: {
        select: {
          id_variante: true,
          precio_base: true,
          Producto: {
            select: {
              id_producto: true,
              nombre: true,
              imagen_url: true,
            },
          },
          Tamano: {
            select: {
              id_tamano: true,
              nombre: true,
            },
          },
          Tipo_Masa: {
            select: {
              id_tipo_masa: true,
              nombre: true,
            },
          },
        },
      },
      Ingredientes: {
        select: {
          id_detalle_ingrediente: true,
          id_ingrediente: true,
          nombre_ingrediente: true,
          precio_ingrediente_unitario: true,
          posicion: true,
          accion: true,
        },
      },
    },
  },
}

    // DTO simplificado para listas de pedidos
export const PedidoListDTO = {
  id_pedido: true,
  id_cliente: true,
  fecha_pedido: true,
  estado_pedido: true,
  total_pedido: true,
  direccion_entrega: true,
  estado_pago: true,
  metodo_pago: true,
  fecha_entrega_estimada: true,
  Cliente: {
    select: {
      id_usuario: true,
      nombre: true,
      apellido: true,
    },
  },
  Repartidor: {
    select: {
      id_usuario: true,
      nombre: true,
      apellido: true,
    },
  },
}

export const PedidoDetailDTO = {
  id_pedido: true,
  id_cliente: true,
  fecha_pedido: true,
  estado_pedido: true,
  total_pedido: true,
  direccion_entrega: true,
  notas_cliente: true,
  id_repartidor: true,
  id_cupon_aplicado: true,
  descuento_aplicado: true,
  metodo_pago: true,
  estado_pago: true,
  fecha_entrega_estimada: true,
  Cliente: {
    select: {
      id_usuario: true,
      nombre: true,
      apellido: true,
      email: true,
      telefono: true,
      direccion: true,
    },
  },
  Repartidor: {
    select: {
      id_usuario: true,
      nombre: true,
      apellido: true,
      telefono: true,
    },
  },
  Cupon: {
    select: {
      id_cupon: true,
      codigo: true,
      tipo_descuento: true,
      valor_descuento: true,
    },
  },
  Detalles: {
    select: {
      id_detalle_pedido: true,
      id_variante: true,
      cantidad: true,
      precio_base_unitario: true,
      precio_ingredientes_adicionales: true,
      subtotal: true,
      Variante: {
        select: {
          id_variante: true,
          precio_base: true,
          Producto: {
            select: {
              id_producto: true,
              nombre: true,
              descripcion: true,
              imagen_url: true,
              Categoria: {
                select: {
                  id_categoria: true,
                  nombre_categoria: true,
                },
              },
            },
          },
          Tamano: {
            select: {
              id_tamano: true,
              nombre: true,
              descripcion: true,
            },
          },
          Tipo_Masa: {
            select: {
              id_tipo_masa: true,
              nombre: true,
              precio_adicional: true,
            },
          },
        },
      },
      Ingredientes: {
        select: {
          id_detalle_ingrediente: true,
          id_ingrediente: true,
          nombre_ingrediente: true,
          precio_ingrediente_unitario: true,
          posicion: true,
          accion: true,
        },
      },
    },
  },
  Pagos: {
    select: {
      id_pago: true,
      monto: true,
      metodo_pago: true,
      estado_transaccion: true,
      fecha_pago: true,
      referencia_transaccion: true,
    },
  },
  Historial_Estados: {
    select: {
      id_historial: true,
      estado_anterior: true,
      estado_nuevo: true,
      fecha_cambio: true,
      cambiado_por_usuario: true,
      Usuario: {
        select: {
          id_usuario: true,
          nombre: true,
          apellido: true,
          rol: true,
        },
      },
    },
    orderBy: {
      fecha_cambio: 'desc',
    },
  },
}

