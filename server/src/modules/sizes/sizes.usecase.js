import prisma from '../../../prisma/context.js'

const getSizes = async () => {
    return await prisma.tamanos.findMany()
}

const getSizeById = async (id) => {
    return await prisma.tamanos.findUnique({
        where: {
            id_tamano: Number(id)
        }
    })
}

const createSize = async (data) => {
    const { nombre, descripcion } = data

    return await prisma.tamanos.create({
        data: {
            nombre,
            descripcion,
        }
    })
}

const updateSize = async (id, data) => {
    const { nombre, descripcion } = data

    return await prisma.tamanos.update({
        where: { id_tamano: Number(id) },
        data: {
            nombre,
            descripcion,
        },
    })
}

const deleteSize = async (id) => {
    return await prisma.tamanos.delete({
        where: {
            id_tamano: Number(id)
        }
    })
}

export {
    getSizes,
    getSizeById,
    createSize,
    updateSize,
    deleteSize
}