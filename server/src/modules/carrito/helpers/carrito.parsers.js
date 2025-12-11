export const parseId = (id) => {
    const parsed = Number.parseInt(id, 10)
    if (isNaN(parsed) || parsed <= 0) {
      throw new Error('ID inválido')
    }
    return parsed
  }
  
  export const parseIngredientes = (ingredientes) => {
    return ingredientes.map((ing) => ({
      id_ingrediente: parseId(ing.id_ingrediente),
      posicion: ing.posicion || null,
      accion: (ing.accion || 'extra').toLowerCase(),
    }))
  }