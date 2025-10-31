import express from 'express'
import * as pedidosController from './pedidos.controller.js'

const router = express.Router()

router.post('/', pedidosController.createPedido.bind(pedidosController))
router.get('/all', pedidosController.getAllPedidos.bind(pedidosController))
router.get('/cliente/:id_cliente', pedidosController.getPedidosByClienteId.bind(pedidosController))
router.get('/repartidor/:id_repartidor', pedidosController.getPedidosByRepartidorId.bind(pedidosController))
router.get('/:id_pedido', pedidosController.getPedidoById.bind(pedidosController))
router.put('/:id_pedido/estado', pedidosController.updatePedidoEstado.bind(pedidosController))
router.put('/:id_pedido/repartidor', pedidosController.updatePedidoRepartidor.bind(pedidosController))
router.put('/:id_pedido', pedidosController.updatePedido.bind(pedidosController))
router.delete('/:id_pedido', pedidosController.deletePedido.bind(pedidosController))

export default router
