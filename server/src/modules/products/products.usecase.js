import prisma from '../../../prisma/context.js'
import { ProductDTO, ProductListDTO } from './products.dto.js'

const getProducts = async () => {
  return await prisma.productos.findMany({ select: ProductListDTO })
}

const getProductById = async (id) => {
  return await prisma.productos.findUnique({
    where: { id_producto: Number(id) },
    select: ProductDTO,
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

    return await prisma.productos.create({ data: payload, select: ProductDTO })
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
        select: ProductDTO,
    })
}

const deleteProduct = async (id) => {
  return await prisma.productos.delete({ where: { id_producto: Number(id) }, select: { id_producto: true } })
}

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct }