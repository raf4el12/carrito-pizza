import express from 'express'
import * as ingredientsController from './ingredients.controller.js'

const router = express.Router()

router.get('/', ingredientsController.getIngredients.bind(ingredientsController))
router.get('/:id', ingredientsController.getIngredientById.bind(ingredientsController))
router.post('/', ingredientsController.createIngredient.bind(ingredientsController))
router.put('/:id', ingredientsController.updateIngredient.bind(ingredientsController))
router.delete('/:id', ingredientsController.deleteIngredient.bind(ingredientsController))

export default router