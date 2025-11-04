import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import type { FC } from 'react'
import type { Product } from '../../../types/products/products.schema'

interface ProductCardProps {
  item: Product
  onEdit?: (item: Product) => void
  onDelete?: (item: Product) => void
  onView?: (item: Product) => void
}

const getStatusColor = (estado: Product['estado']) => {
  switch (estado) {
    case 'activo':
      return 'success'
    case 'inactivo':
      return 'error'
    default:
      return 'default'
  }
}

const ProductCard: FC<ProductCardProps> = ({ item, onEdit, onDelete, onView }) => {
  const handleEdit = () => onEdit?.(item)
  const handleDelete = () => onDelete?.(item)
  const handleView = () => onView?.(item)
  const description = item.descripcion?.trim() ? item.descripcion : 'Sin descripción'

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
      {/* Imagen del producto */}
      {item.imagen_url ? (
        <CardMedia
          component="img"
          height="200"
          image={item.imagen_url}
          alt={item.nombre}
          sx={{
            objectFit: 'cover',
            backgroundColor: 'grey.100',
          }}
        />
      ) : (
        <Box
          sx={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.100',
            color: 'grey.400',
          }}
        >
          <i className="ri-image-line" style={{ fontSize: '48px' }} />
        </Box>
      )}

      <CardContent sx={{ flex: 1 }}>
        <Stack spacing={2}>
          {/* Header con nombre y estado */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.2,
                flex: 1,
              }}
            >
              {item.nombre}
            </Typography>
            <Chip label={item.estado} color={getStatusColor(item.estado)} size="small" />
          </Box>

          {/* Categoría */}
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              Categoría
            </Typography>
            <Typography variant="body2" color="text.primary" fontWeight={500}>
              {item.Categoria?.nombre_categoria || 'Sin categoría'}
            </Typography>
          </Box>

          {/* Descripción */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </Typography>

          {/* ID del producto */}
          <Box sx={{ mt: 'auto' }}>
            <Typography variant="caption" color="text.secondary">
              ID: {item.id_producto}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      {/* Acciones */}
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box>
          {onView && (
            <IconButton size="medium" onClick={handleView} title="Ver detalles">
              <i className="ri-eye-line" style={{ fontSize: '24px', color: '#5271FF' }} />
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

export default ProductCard
