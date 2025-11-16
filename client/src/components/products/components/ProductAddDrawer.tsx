'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import SaveIcon from '@mui/icons-material/Save'
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useProductAddHook } from '../hooks/useProductAddHook'
import { useCategories } from '../../../hook/categories/useCategories'
import type { Product } from '../../../types/products/products.schema'
import { resolveImageUrl } from '../../../shared/utils/media'

interface ProductAddDrawerProps {
  onBack: () => void
  onSuccess?: (product: Product) => void
}

const ProductAddDrawer = ({ onBack, onSuccess }: ProductAddDrawerProps) => {
  const {
    formData,
    errors,
    isSubmitting,
    canSubmit,
    handleInputChange,
    handleCategoryChange,
    handleStatusChange,
    handleSubmit,
    handleBack,
  } = useProductAddHook({ onBack, onSuccess })

  const { data: categories, isLoading: loadingCategories } = useCategories()
  const previewImage = resolveImageUrl(formData.imagen_url)

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 3 }}>
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
              Crear producto
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Completa la información para agregar un nuevo producto al catálogo.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Chip label={formData.estado} size="small" color="success" variant="outlined" />
            </Box>
          </Box>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar producto'}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Product Image Preview */}
            <Card sx={{ overflow: 'hidden' }}>
              {previewImage ? (
                <CardMedia
                  component="img"
                  height="300"
                  image={previewImage}
                  alt="Vista previa"
                  sx={{
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    height: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'grey.100',
                    color: 'grey.400',
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <AddPhotoAlternateIcon sx={{ fontSize: 80 }} />
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      Sin imagen
                    </Typography>
                  </Box>
                </Box>
              )}
            </Card>

            {/* Basic Information */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Información básica
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nombre del producto"
                    value={formData.nombre}
                    onChange={handleInputChange('nombre')}
                    error={!!errors.nombre}
                    helperText={errors.nombre}
                    required
                    inputProps={{ maxLength: 255 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required error={!!errors.id_categoria}>
                    <InputLabel>Categoría</InputLabel>
                    <Select
                      value={formData.id_categoria}
                      label="Categoría"
                      onChange={handleCategoryChange}
                      disabled={loadingCategories}
                    >
                      {loadingCategories ? (
                        <MenuItem value="">Cargando...</MenuItem>
                      ) : (
                        categories?.map((category) => (
                          <MenuItem key={category.id_categoria} value={category.id_categoria}>
                            {category.nombre_categoria}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                    {errors.id_categoria && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                        {errors.id_categoria}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={formData.estado}
                      label="Estado"
                      onChange={handleStatusChange}
                    >
                      <MenuItem value="activo">Activo</MenuItem>
                      <MenuItem value="inactivo">Inactivo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="URL de la imagen"
                    value={formData.imagen_url}
                    onChange={handleInputChange('imagen_url')}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    inputProps={{ maxLength: 255 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Descripción"
                    value={formData.descripcion}
                    onChange={handleInputChange('descripcion')}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
            </Card>
          </Stack>
        </Grid>

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
                    {formData.nombre || 'Sin nombre'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Categoría
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formData.id_categoria
                      ? categories?.find((c) => c.id_categoria === formData.id_categoria)
                          ?.nombre_categoria
                      : 'No seleccionada'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Estado
                  </Typography>
                  <Chip
                    label={formData.estado}
                    size="small"
                    color={formData.estado === 'activo' ? 'success' : 'error'}
                    variant="outlined"
                  />
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
                  startIcon={<SaveIcon />}
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? 'Creando...' : 'Crear producto'}
                </Button>
                <Button variant="outlined" fullWidth onClick={handleBack}>
                  Cancelar
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductAddDrawer
