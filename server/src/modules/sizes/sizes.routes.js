import express from 'express'
import * as sizesController from './sizes.controller.js'

const router = express.Router()

router.get('/', sizesController.getSizes.bind(sizesController))
router.get('/:id', sizesController.getSizeById.bind(sizesController))
router.post('/', sizesController.createSize.bind(sizesController))
router.put('/:id', sizesController.updateSize.bind(sizesController))
router.delete('/:id', sizesController.deleteSize.bind(sizesController))

export default router
