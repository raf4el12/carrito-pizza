import express from 'express'
import * as variantsController from './variants.controller.js'

const router = express.Router()

router.get('/', variantsController.getVariantsProducts.bind(variantsController))
router.get('/:id', variantsController.getVariantProductById.bind(variantsController))
router.post('/', variantsController.createVariantProduct.bind(variantsController))
router.put('/:id', variantsController.updateVariantProduct.bind(variantsController))
router.delete('/:id', variantsController.deleteVariantProduct.bind(variantsController))

export default router