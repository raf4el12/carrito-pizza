import prisma from '../../../prisma/context.js'

const getProducts = async () => {
    return await prisma.productos.findMany()
}

const getProductById = async (id) => {
    return await prisma.productos.findUnique({
        where: {
            id_producto: id
        }
    })
}

const createProduct = async (data) => {
    const {
        nombre,
        descripcion,
        imagen_url,
        id_categoria,       
        categoriaNombre,    
        estado,             
    } = data

    const payload = {
        nombre,
        descripcion,
        imagen_url,
        estado,
    }

    if (id_categoria) {
        payload.id_categoria = Number(id_categoria)
    } else if (categoriaNombre) {
        payload.Categoria = {
            connectOrCreate: {
                where: { nombre_categoria: categoriaNombre },
                create: { nombre_categoria: categoriaNombre },
            },
        }
    } else {
        throw new Error('Debe enviar id_categoria o categoriaNombre')
    }

    return await prisma.productos.create({ data: payload })
}

const updateProduct = async (id, data) => {
    const {
        nombre,
        descripcion,
        imagen_url,
        id_categoria,
        categoriaNombre,
        estado,
    } = data

    const payload = {
        nombre,
        descripcion,
        imagen_url,
        estado,
    }

    if (id_categoria) {
        payload.id_categoria = Number(id_categoria)
    } else if (categoriaNombre) {
        payload.Categoria = {
            connectOrCreate: {
                where: { nombre_categoria: categoriaNombre },
                create: { nombre_categoria: categoriaNombre },
            },
        }
    }

    return await prisma.productos.update({ 
        where: { id_producto: Number(id) },
        data: payload,
    })
}

const deleteProduct = async (id) => {
    return await prisma.productos.delete({
        where: {
            id_producto: id
        }
    })
}

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct }