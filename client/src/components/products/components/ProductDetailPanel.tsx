'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import type { Product } from '../../../types/products/products.schema'
import { useProductDetailHook } from '../hooks/useProductDetailHook'

interface ProductDetailPanelProps {
  product: Product | null
  onBack: () => void
  onEdit?: (product: Product) => void
}

const ProductDetailPanel = ({ product, onBack, onEdit }: ProductDetailPanelProps) => {
  const {
    hasProduct,
    formattedDate,
    statusColor,
    categoryName,
    hasImage,
    imageUrl,
    handleEdit,
  } = useProductDetailHook({ product, onEdit })

  if (!hasProduct || !product) return null

  return (
    <Box sx={{ mt: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 3 }}>
          Volver a la lista
        </Button>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }} gutterBottom>
              {product.nombre}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Producto ID: {product.id_producto}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Chip
                label={product.estado}
                size="small"
                color={statusColor}
                variant="outlined"
              />
              <Chip label={categoryName} size="small" color="primary" />
            </Box>
          </Box>

          <IconButton
            color="primary"
            onClick={handleEdit}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column - Main Info */}
        <Grid item xs={12} md={8}>
          {/* Product Image Section */}
          <Card sx={{ mb: 3, overflow: 'hidden' }}>
            {hasImage ? (
              <CardMedia
                component="img"
                height="400"
                image={imageUrl}
                alt={product.nombre}
                sx={{
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Box
                sx={{
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'grey.100',
                  color: 'grey.400',
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <i className="ri-image-line" style={{ fontSize: '80px' }} />
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    Sin imagen
                  </Typography>
                </Box>
              </Box>
            )}
          </Card>

          {/* Product Information */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información del producto
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Nombre
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {product.nombre}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Categoría
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {categoryName}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Estado
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {product.estado}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      ID Producto
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {product.id_producto}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Card>

          {/* Description */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Descripción
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              {product.descripcion || 'Sin descripción disponible'}
            </Typography>
          </Card>
        </Grid>

        {/* Right Column - Sidebar */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Resumen rápido
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Nombre
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {product.nombre}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Categoría
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {categoryName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Estado
                  </Typography>
                  <Chip label={product.estado} size="small" color={statusColor} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Fecha de creación
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formattedDate}
                  </Typography>
                </Box>
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Acciones
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                >
                  Editar producto
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductDetailPanel
