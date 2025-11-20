import prisma from '../../../prisma/context.js'
import { ReviewDTO, ReviewListDTO } from './reviews.dto.js'
import {
  buildFilters,
  sanitizeReviewPayload,
} from './functions/reviews.usecase.functions.js'

const getReviews = async (filters = {}) => {
  const where = buildFilters(filters)
  return prisma.resenas.findMany({
    where,
    select: ReviewListDTO,
    orderBy: { created_at: 'desc' },
  })
}

const getReviewById = async (id) => {
  return prisma.resenas.findFirst({
    where: { id_resena: Number(id), deleted_at: null },
    select: ReviewDTO,
  })
}

const createReview = async (data) => {
  const payload = sanitizeReviewPayload(data)
  return prisma.resenas.create({ data: payload, select: ReviewDTO })
}

const updateReview = async (id, data) => {
  const payload = sanitizeReviewPayload(data)
  return prisma.resenas.update({
    where: { id_resena: Number(id) },
    data: payload,
    select: ReviewDTO,
  })
}

const deleteReview = async (id) => {
  return prisma.resenas.update({
    where: { id_resena: Number(id) },
    data: { visible: false, deleted_at: new Date() },
    select: { id_resena: true },
  })
}

export { getReviews, getReviewById, createReview, updateReview, deleteReview }
