import express from 'express'
import * as productsController from './products.controller.js'

const router = express.Router()

router.get('/', productsController.getProducts.bind(productsController))
router.get('/:id', productsController.getProductById.bind(productsController))
router.post('/', productsController.createProduct.bind(productsController))
router.put('/:id', productsController.updateProduct.bind(productsController))
router.delete('/:id', productsController.deleteProduct.bind(productsController))

export default router