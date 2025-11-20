'use client'

import { useMemo } from 'react'
import Grid from '@mui/material/Grid2'
import { Box, Card, CardContent, Chip, LinearProgress, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useReviews } from '../../hook/reviews/useReviews'

const RATING_LEVELS = [5, 4, 3, 2, 1]

const ReviewsStatistics = () => {
  const theme = useTheme()
  const { data: reviews = [], isLoading, isError } = useReviews()

  const stats = useMemo(() => {
    const total = reviews.length
    if (total === 0) {
      return {
        total: 0,
        avgRating: '0.0',
        positivePercentage: 0,
        newReviews: 0,
        distribution: RATING_LEVELS.map((rating) => ({ rating, value: 0, percent: 0 })),
      }
    }

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    const avgRating = (sum / total).toFixed(2)
    const positive = reviews.filter((review) => review.rating >= 4).length
    const positivePercentage = Math.round((positive / total) * 100)

    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const newReviews = reviews.filter((review) => {
      const createdAt = new Date(review.created_at).getTime()
      return !Number.isNaN(createdAt) && createdAt >= oneWeekAgo
    }).length

    const distribution = RATING_LEVELS.map((rating) => {
      const value = reviews.filter((review) => review.rating === rating).length
      const percent = total ? Math.round((value / total) * 100) : 0
      return { rating, value, percent }
    })

    return { total, avgRating, positivePercentage, newReviews, distribution }
  }, [reviews])

  const renderContent = () => {
    if (isError) {
      return (
        <Typography color="error">
          Ocurrió un error al cargar las estadísticas de reseñas.
        </Typography>
      )
    }

    return (
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5">Estadísticas de reseñas</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h3" color="primary" fontWeight={600}>
                {stats.avgRating}
              </Typography>
              <i className="ri-star-smile-line text-[32px] text-primary" />
            </Box>
            <Typography color="text.secondary">
              Promedio basado en {stats.total} reseña{stats.total === 1 ? '' : 's'}.
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography>{stats.newReviews} reseñas nuevas esta semana</Typography>
              <Chip
                label={`${stats.positivePercentage}% positivas`}
                variant="outlined"
                size="small"
                color="success"
              />
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box display="flex" flexDirection="column" gap={1.5}>
            {stats.distribution.map((item) => (
              <Box key={item.rating} display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" width={60} color="text.secondary">
                  {item.rating} estrellas
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={item.percent}
                  sx={{ flexGrow: 1, height: 8, borderRadius: theme.shape.borderRadius }}
                  color={item.rating >= 4 ? 'success' : item.rating === 3 ? 'warning' : 'error'}
                />
                <Typography variant="body2" width={40} textAlign="right">
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    )
  }

  return (
    <Card>
      <CardContent>{isLoading ? <LinearProgress /> : renderContent()}</CardContent>
    </Card>
  )
}

export default ReviewsStatistics
