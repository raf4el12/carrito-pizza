import * as carritoUseCase from './carrito.usecase.js'

const getCarritoByClienteId = async (req, res) => {
  const { id_cliente } = req.params
  const carrito = await carritoUseCase.getCarritoByClienteId(id_cliente)
  res.status(200).json(carrito)
}

const createCarrito = async (req, res) => {
  const carrito = await carritoUseCase.createCarritoItem(req.body)
  res.status(201).json(carrito)
}

const updateCarrito = async (req, res) => {
  const { id } = req.params
  const { cantidad } = req.body
  const carrito = await carritoUseCase.updateCarritoCantidad(id, cantidad)
  res.status(200).json(carrito)
}

const deleteCarrito = async (req, res) => {
  const { id } = req.params
  await carritoUseCase.deleteCarritoItem(id)
  res.status(200).json({ message: 'Item eliminado del carrito' })
}

const clearCarritoByClienteId = async (req, res) => {
  const { id_cliente } = req.params
  const result = await carritoUseCase.clearCarritoByClienteId(id_cliente)
  res.status(200).json(result)
}

export { 
  getCarritoByClienteId, 
  createCarrito, 
  updateCarrito, 
  deleteCarrito, 
  clearCarritoByClienteId 
}