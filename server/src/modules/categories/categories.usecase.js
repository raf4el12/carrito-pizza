import prisma from '../../../prisma/context.js'


const getCategories = async () => {
    return await prisma.categorias.findMany()
}

const getCategoryById = async (id) => {
    return await prisma.categorias.findUnique({
        where: {
            id_categoria: id
        }
    })
}

const createCategory = async (data) => {
    return await prisma.categorias.create({
        data: data
    })
}

const updateCategory = async (id, data) => {
    return await prisma.categorias.update({
        where: {
            id_categoria: id
        },
        data: data
    })
}

const deleteCategory = async (id) => {
    return await prisma.categorias.delete({
        where: {
            id_categoria: id
        }
    })
}

export { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory }