import express from 'express'
import * as categoriesController from './categories.controller.js'

const router = express.Router()

router.get('/', categoriesController.getCategories.bind(categoriesController))
router.get('/:id', categoriesController.getCategoryById.bind(categoriesController))
router.post('/', categoriesController.createCategory.bind(categoriesController))
router.put('/:id', categoriesController.updateCategory.bind(categoriesController))
router.delete('/:id', categoriesController.deleteCategory.bind(categoriesController))

export default router