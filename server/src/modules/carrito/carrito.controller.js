import * as carritoUseCase from './carrito.usecase.js'

const getCarrito = async (req, res) => {
    const carrito = await carritoUseCase.getCarrito()
    res.status(200).json(carrito)
}

const getCarritoById = async (req, res) => {
    const { id } = req.params
    const carrito = await carritoUseCase.getCarritoById(id)
    res.status(200).json(carrito)
}

const createCarrito = async (req, res) => {
    const carrito = await carritoUseCase.createCarrito(req.body)
    res.status(201).json(carrito)
}

const updateCarrito = async (req, res) => {
    const { id } = req.params
    const carrito = await carritoUseCase.updateCarrito(id, req.body)
    res.status(200).json(carrito)
}

const deleteCarrito = async (req, res) => {
    const { id } = req.params
    const carrito = await carritoUseCase.deleteCarrito(id)
    res.status(200).json(carrito)
}

export { getCarrito, getCarritoById, createCarrito, updateCarrito, deleteCarrito }