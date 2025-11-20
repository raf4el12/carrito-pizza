import express from 'express'
import * as masaTypesController from './masaTypes.controller.js'

const router = express.Router()

router.get('/', masaTypesController.getMasaTypes.bind(masaTypesController))
router.get('/:id', masaTypesController.getMasaTypeById.bind(masaTypesController))
router.post('/', masaTypesController.createMasaType.bind(masaTypesController))
router.put('/:id', masaTypesController.updateMasaType.bind(masaTypesController))
router.delete('/:id', masaTypesController.deleteMasaType.bind(masaTypesController))

export default router


