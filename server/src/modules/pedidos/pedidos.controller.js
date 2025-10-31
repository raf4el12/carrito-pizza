import * as pedidosUseCase from './pedidos.usecase.js'

const createPedido = async (req, res) => {
  const pedido = await pedidosUseCase.createPedido(req.body)
  res.status(201).json(pedido)
}

const getPedidoById = async (req, res) => {
  const pedido = await pedidosUseCase.getPedidoById(req.params.id_pedido)
  res.status(200).json(pedido)
}

const getPedidosByClienteId = async (req, res) => {
  const pedidos = await pedidosUseCase.getPedidosByClienteId(req.params.id_cliente)
  res.status(200).json(pedidos)
}

const getPedidosByRepartidorId = async (req, res) => {
  const pedidos = await pedidosUseCase.getPedidosByRepartidorId(req.params.id_repartidor)
  res.status(200).json(pedidos)
}

const getAllPedidos = async (req, res) => {
  const { estado_pedido, estado_pago } = req.query
  const filters = {}
  if (estado_pedido) filters.estado_pedido = estado_pedido
  if (estado_pago) filters.estado_pago = estado_pago

  const pedidos = await pedidosUseCase.getAllPedidos(filters)
  res.status(200).json(pedidos)
}

const updatePedidoEstado = async (req, res) => {
  const { id_pedido } = req.params
  const { estado_pedido } = req.body
  const id_usuario = req.user?.id_usuario || null

  const pedido = await pedidosUseCase.updatePedidoEstado(id_pedido, estado_pedido, id_usuario)
  res.status(200).json(pedido)
}

const updatePedidoRepartidor = async (req, res) => {
  const { id_pedido } = req.params
  const { id_repartidor } = req.body

  const pedido = await pedidosUseCase.updatePedidoRepartidor(id_pedido, id_repartidor)
  res.status(200).json(pedido)
}

const updatePedido = async (req, res) => {
  const { id_pedido } = req.params
  const pedido = await pedidosUseCase.updatePedido(id_pedido, req.body)
  res.status(200).json(pedido)
}

const deletePedido = async (req, res) => {
  const pedido = await pedidosUseCase.deletePedido(req.params.id_pedido)
  res.status(200).json(pedido)
}

export {
  createPedido,
  getPedidoById,
  getPedidosByClienteId,
  getPedidosByRepartidorId,
  getAllPedidos,
  updatePedidoEstado,
  updatePedidoRepartidor,
  updatePedido,
  deletePedido,
}
