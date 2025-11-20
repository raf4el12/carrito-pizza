import * as reviewsUseCase from './reviews.usecase.js'
import { buildReviewFilters, sendNotFound } from './functions/reviews.controller.functions.js'

const getReviews = async (req, res) => {
  const filters = buildReviewFilters(req.query)
  const reviews = await reviewsUseCase.getReviews(filters)

  res.status(200).json(reviews)
}

const getReviewById = async (req, res) => {
  const { id } = req.params
  const review = await reviewsUseCase.getReviewById(id)

  if (!review) {
    return sendNotFound(res)
  }

  res.status(200).json(review)
}

const createReview = async (req, res) => {
  const review = await reviewsUseCase.createReview(req.body)
  res.status(201).json(review)
}

const updateReview = async (req, res) => {
  const { id } = req.params
  const review = await reviewsUseCase.updateReview(id, req.body)
  res.status(200).json(review)
}

const deleteReview = async (req, res) => {
  const { id } = req.params
  await reviewsUseCase.deleteReview(id)
  res.status(200).json({ id })
}

export { getReviews, getReviewById, createReview, updateReview, deleteReview }
