import express from 'express'
import * as reviewsController from './reviews.controller.js'

const router = express.Router()

router.get('/', reviewsController.getReviews.bind(reviewsController))
router.get('/:id', reviewsController.getReviewById.bind(reviewsController))
router.post('/', reviewsController.createReview.bind(reviewsController))
router.put('/:id', reviewsController.updateReview.bind(reviewsController))
router.delete('/:id', reviewsController.deleteReview.bind(reviewsController))

export default router
