'use client'

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import type { MasaType } from '../../../types/masa-types/masa-types.schema'
import { formatNumber } from '../../../shared/utils/format'

interface MasaTypeCardProps {
  item: MasaType
  onEdit?: (masaType: MasaType) => void
  onDelete?: (masaType: MasaType) => void
}

const MasaTypeCard = ({ item, onEdit, onDelete }: MasaTypeCardProps) => {
  const handleEdit = () => onEdit?.(item)
  const handleDelete = () => onDelete?.(item)

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
            <Chip
              label={item.activo ? 'activo' : 'inactivo'}
              color={item.activo ? 'success' : 'default'}
              size="small"
            />
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              Precio adicional
            </Typography>
            <Typography variant="body2" color="text.primary" fontWeight={500}>
              S/ {formatNumber(item.precio_adicional, 2)}
            </Typography>
          </Box>

          {item.descripcion && (
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
              {item.descripcion}
            </Typography>
          )}

          <Box sx={{ mt: 'auto' }}>
            <Typography variant="caption" color="text.secondary">
              ID: {item.id_tipo_masa}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
        {onEdit && (
          <IconButton size="medium" onClick={handleEdit} title="Editar">
            <i className="ri-edit-box-line" style={{ fontSize: '24px', color: '#5271FF' }} />
          </IconButton>
        )}
        {onDelete && (
          <IconButton size="medium" onClick={handleDelete} title="Eliminar">
            <i className="ri-delete-bin-6-line" style={{ fontSize: '24px', color: '#FF3535' }} />
          </IconButton>
        )}
      </CardActions>
    </Card>
  )
}

export default MasaTypeCard


