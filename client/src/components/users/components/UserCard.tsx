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
import type { FC } from 'react'
import type { User } from '../../../types/user/user.schema'

interface UserCardProps {
  item: User
  onEdit?: (user: User) => void
  onDelete?: (user: User) => void
  onView?: (user: User) => void
}

const getRoleColor = (rol: User['rol']) => {
  switch (rol) {
    case 'administrador':
      return 'error'
    case 'repartidor':
      return 'warning'
    case 'cliente':
      return 'info'
    default:
      return 'default'
  }
}

const UserCard: FC<UserCardProps> = ({ item, onEdit, onDelete, onView }) => {
  const handleEdit = () => onEdit?.(item)
  const handleDelete = () => onDelete?.(item)
  const handleView = () => onView?.(item)

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
              {item.nombre} {item.apellido}
            </Typography>
            <Chip label={item.rol} color={getRoleColor(item.rol)} size="small" />
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              {item.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.username}
            </Typography>
          </Box>

          <Box sx={{ mt: 'auto' }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Teléfono
            </Typography>
            <Typography variant="body2" color="text.primary">
              {item.telefono?.trim() || 'Sin teléfono'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              Dirección
            </Typography>
            <Typography variant="body2" color="text.primary">
              {item.direccion?.trim() || 'Sin dirección'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              ID usuario
            </Typography>
            <Typography variant="body2" color="text.primary">
              {item.id_usuario}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

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
            <i className="ri-delete-bin-6-line" style={{ fontSize: '24px', color: '#FF3535' }} />
          </IconButton>
        )}
      </CardActions>
    </Card>
  )
}

export default UserCard
