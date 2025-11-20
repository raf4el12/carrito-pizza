import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import ManageReviewsTable from '../manage-reviews/ManageReviewsTable'
import LoadingPage from '../commons/LoadingPage'
import ConfirmDeleteDialog from '../commons/ConfirmDeleteDialog'
import { useReviews } from '../../hook/reviews/useReviews'
import { useReviewDelete } from '../../hook/reviews/useReviewDelete'

const ReviewsList = () => {
  const { data: reviews = [], isLoading, isError, error } = useReviews()
  const deleteMutation = useReviewDelete()
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null)

  const handleDeleteRequest = (id: number) => {
    setReviewToDelete(id)
  }

  const handleCloseDialog = () => setReviewToDelete(null)

  const handleConfirmDelete = () => {
    if (reviewToDelete === null) return
    deleteMutation.mutate(reviewToDelete, {
      onSettled: () => setReviewToDelete(null),
    })
  }

  if (isLoading) {
    return <LoadingPage />
  }

  if (isError) {
    return (
      <Box className="bg-red-50 border border-red-200 rounded-lg p-4">
        <Typography variant="body1" color="error">
          {error instanceof Error ? error.message : 'Error al cargar las reseñas'}
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Stack spacing={3} sx={{ p: { xs: 0, md: 1 } }}>
        {/* <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
            Visualiza las reseñas!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gestiona las reseñas enviadas por los clientes y mantén el catálogo actualizado.
          </Typography>
        </Box> */}

        <ManageReviewsTable reviewsData={reviews} onDelete={handleDeleteRequest} />
      </Stack>

      <ConfirmDeleteDialog
        open={reviewToDelete !== null}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}

export default ReviewsList
