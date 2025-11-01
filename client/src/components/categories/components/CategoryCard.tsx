import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import type { FC } from 'react'
import type { Category } from '../../../types/categories/categories.schema'

interface CategoryCardProps {
  item: Category
  onEdit?: (item: Category) => void
  onDelete?: (item: Category) => void
  onView?: (item: Category) => void
}

const CategoryCard: FC<CategoryCardProps> = ({
  item,
  onEdit,
  onDelete,
  onView,
}) => {
  const handleEdit = () => onEdit?.(item)
  const handleDelete = () => onDelete?.(item)
  const handleView = () => onView?.(item)
  const description = item.descripcion?.trim()
    ? item.descripcion
    : 'Sin descripción'

  return (
    <Card
      sx={{
        minWidth: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
      variant="outlined"
    >
      <CardContent sx={{ flex: 1 }}>
        <Stack spacing={2}>
          {/* Header con nombre */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.2,
              }}
            >
              {item.nombre_categoria}
            </Typography>
          </Box>

          {/* Descripción */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </Typography>

          {/* ID de categoría */}
          <Box sx={{ mt: 'auto' }}>
            <Typography variant="caption" color="text.secondary">
              ID: {item.id_categoria}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      {/* Acciones */}
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box>
          {onView && (
            <IconButton size="medium" onClick={handleView} title="Ver detalles">
              <i
                className="ri-eye-line"
                style={{ fontSize: '24px', color: '#5271FF' }}
              />
            </IconButton>
          )}
          {onEdit && (
            <IconButton size="medium" onClick={handleEdit} title="Editar">
              <i
                className="ri-edit-box-line"
                style={{ fontSize: '24px', color: '#5271FF' }}
              />
            </IconButton>
          )}
        </Box>
        {onDelete && (
          <IconButton size="medium" onClick={handleDelete} title="Eliminar">
            <i
              className="ri-delete-bin-6-line"
              style={{ fontSize: '24px', color: '#FF3535' }}
            />
          </IconButton>
        )}
      </CardActions>
    </Card>
  )
}

export default CategoryCard
