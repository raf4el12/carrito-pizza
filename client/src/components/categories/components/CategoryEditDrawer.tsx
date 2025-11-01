import { Close as CloseIcon } from '@mui/icons-material'
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useCategoriesUpdate } from '../../../hook/categories/useCategoriesUpdate'
import type { Category } from '../../../types/categories/categories.schema'

interface CategoryEditDrawerProps {
  open: boolean
  onClose: () => void
  category: Category | null
}

const CategoryEditDrawer = ({
  open,
  onClose,
  category,
}: CategoryEditDrawerProps) => {
  const [formData, setFormData] = useState({
    nombre_categoria: '',
    descripcion: '',
  })
  const [errors, setErrors] = useState<{
    nombre_categoria?: string
    descripcion?: string
  }>({})

  const updateCategory = useCategoriesUpdate()

  // Cargar datos de la categoría cuando se abre el drawer
  useEffect(() => {
    if (category) {
      setFormData({
        nombre_categoria: category.nombre_categoria || '',
        descripcion: category.descripcion || '',
      })
    }
  }, [category, open])

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setFormData((prev) => ({ ...prev, [field]: value }))

      // Limpiar error cuando el usuario empiece a escribir
      if (errors[field as keyof typeof errors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }

  const validateForm = () => {
    const newErrors: { nombre_categoria?: string; descripcion?: string } = {}

    if (!formData.nombre_categoria.trim()) {
      newErrors.nombre_categoria = 'El nombre es requerido'
    }

    if (formData.nombre_categoria.length > 100) {
      newErrors.nombre_categoria =
        'El nombre no puede exceder 100 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm() || !category) return

    try {
      await updateCategory.mutateAsync({
        id: category.id_categoria,
        data: {
          nombre_categoria: formData.nombre_categoria.trim(),
          descripcion: formData.descripcion.trim() || null,
        },
      })

      // Cerrar drawer
      handleClose()
    } catch (error) {
      // El error ya se maneja en el hook con toast
    }
  }

  const handleClose = () => {
    setFormData({ nombre_categoria: '', descripcion: '' })
    setErrors({})
    onClose()
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } },
      }}
    >
      <Box
        sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Editar Categoría
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Form */}
        <Box sx={{ flex: 1 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Nombre de la categoría"
              value={formData.nombre_categoria}
              onChange={handleInputChange('nombre_categoria')}
              error={!!errors.nombre_categoria}
              helperText={errors.nombre_categoria}
              required
              autoFocus
              inputProps={{ maxLength: 100 }}
            />

            <TextField
              fullWidth
              label="Descripción"
              value={formData.descripcion}
              onChange={handleInputChange('descripcion')}
              error={!!errors.descripcion}
              helperText={errors.descripcion}
              multiline
              rows={4}
              placeholder="Descripción opcional de la categoría..."
            />
          </Stack>
        </Box>

        {/* Actions */}
        <Box sx={{ pt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            fullWidth
            disabled={updateCategory.isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            disabled={updateCategory.isPending || !formData.nombre_categoria.trim()}
          >
            {updateCategory.isPending ? 'Actualizando...' : 'Actualizar'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default CategoryEditDrawer
