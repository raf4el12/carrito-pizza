import express from 'express'
import * as carritoController from './carrito.controller.js'

const router = express.Router()

router.get('/cliente/:id_cliente', carritoController.getCarritoByClienteId.bind(carritoController))
router.post('/', carritoController.createCarrito.bind(carritoController))
router.put('/:id', carritoController.updateCarrito.bind(carritoController))
router.delete('/:id', carritoController.deleteCarrito.bind(carritoController))
router.delete('/clear/:id_cliente', carritoController.clearCarritoByClienteId.bind(carritoController))

export default router