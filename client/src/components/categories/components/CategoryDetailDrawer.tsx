import { Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material'
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import type { Category } from '../../../types/categories/categories.schema'

interface CategoryDetailDrawerProps {
  open: boolean
  onClose: () => void
  onEdit?: (category: Category) => void
  category: Category | null
}

const CategoryDetailDrawer = ({
  open,
  onClose,
  onEdit,
  category,
}: CategoryDetailDrawerProps) => {
  if (!category) return null

  const handleEdit = () => {
    if (onEdit) {
      onEdit(category)
      onClose()
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
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
            Detalles de la Categoría
          </Typography>
          <Box>
            {onEdit && (
              <IconButton onClick={handleEdit} size="small" title="Editar">
                <EditIcon />
              </IconButton>
            )}
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Content */}
        <Box sx={{ flex: 1 }}>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 0.5 }}
              >
                ID
              </Typography>
              <Typography variant="body1" color="text.primary">
                {category.id_categoria}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 0.5 }}
              >
                Nombre de la categoría
              </Typography>
              <Typography variant="body1" color="text.primary" fontWeight={600}>
                {category.nombre_categoria}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 0.5 }}
              >
                Descripción
              </Typography>
              <Typography variant="body1" color="text.primary">
                {category.descripcion || 'Sin descripción'}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Actions */}
        <Box sx={{ pt: 3 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            fullWidth
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            Cerrar
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default CategoryDetailDrawer
