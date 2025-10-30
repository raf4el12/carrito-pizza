import prisma from '../../../prisma/context.js'

const getIngredients = async () => {
    return await prisma.ingredientes.findMany({
        orderBy: {
            nombre: 'asc'
        }
    })
}

const getIngredientById = async (id) => {
    return await prisma.ingredientes.findUnique({
        where: {
            id_ingrediente: Number.parseInt(id, 10)
        }
    })
}

const createIngredient = async (data) => {
    const { nombre, precio_adicional, stock_disponible, activo } = data

    return await prisma.ingredientes.create({
        data: {
            nombre,
            precio_adicional: Number(precio_adicional),
            stock_disponible: stock_disponible ? Number(stock_disponible) : 0,
            activo: activo !== undefined ? activo : true
        }
    })
}

const updateIngredient = async (id, data) => {
    const { nombre, precio_adicional, stock_disponible, activo } = data

    const payload = {
        nombre,
        activo,
        ...(precio_adicional !== undefined && { precio_adicional: Number(precio_adicional) }),
        ...(stock_disponible !== undefined && { stock_disponible: Number(stock_disponible) }),
    }

    return await prisma.ingredientes.update({
        where: {
            id_ingrediente: Number.parseInt(id, 10)
        },
        data: payload
    })
}

const deleteIngredient = async (id) => {
    return await prisma.ingredientes.delete({
        where: {
            id_ingrediente: Number.parseInt(id, 10)
        }
    })
}

export {
    getIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
}