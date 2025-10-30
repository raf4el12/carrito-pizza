import * as productsUseCase from './products.usecase.js'

const getProducts = async (req, res) => {
    const products = await productsUseCase.getProducts()
    res.status(200).json(products)
}


const getProductById = async (req, res) => {
    const { id } = req.params
    const product = await productsUseCase.getProductById(id)
    res.status(200).json(product)
}

const createProduct = async (req, res) => {
    const product = await productsUseCase.createProduct(req.body)
    res.status(201).json(product)
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const product = await productsUseCase.updateProduct(id, req.body)
    res.status(200).json(product)
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const product = await productsUseCase.deleteProduct(id)
    res.status(200).json(product)
}

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct }