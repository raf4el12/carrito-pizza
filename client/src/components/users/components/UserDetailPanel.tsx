'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import type { User } from '../../../types/user/user.schema'
import { useUserDetailHook } from '../hooks/useUserDetailHook'

interface UserDetailPanelProps {
  user: User | null
  onBack: () => void
  onEdit?: (user: User) => void
}

const UserDetailPanel = ({ user, onBack, onEdit }: UserDetailPanelProps) => {
  const { hasUser, initials, fullName, formattedDate, roleColor, handleEdit } =
    useUserDetailHook({ user, onEdit })

  if (!hasUser || !user) return null

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
              {fullName || 'Usuario sin nombre'}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Usuario ID: {user.id_usuario}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Chip
                label={user.rol}
                size="small"
                color={roleColor}
                variant="outlined"
              />
              <Chip
                label={user.activo ? 'Activo' : 'Inactivo'}
                size="small"
                color={user.activo ? 'success' : 'error'}
              />
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
          {/* Profile Image / Avatar Section */}
          <Card sx={{ mb: 3, overflow: 'hidden' }}>
            <Box
              sx={{
                height: 260,
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Avatar
                sx={{
                  width: 160,
                  height: 160,
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontSize: '3.5rem',
                  fontWeight: 'bold',
                }}
                src={undefined}
              >
                {initials || 'US'}
              </Avatar>
            </Box>
          </Card>

          {/* Contact Information */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información de contacto
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {user.email || 'No disponible'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Teléfono
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {user.telefono?.trim() || 'No registrado'}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Username
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {user.username}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Dirección
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {user.direccion?.trim() || 'No registrada'}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Card>

          {/* Account Information */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información de la cuenta
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Datos generales y estado del usuario dentro del sistema.
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Rol asignado
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user.rol}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Estado
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user.activo ? 'Activo' : 'Inactivo'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Fecha de registro
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {formattedDate}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    ID usuario
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user.id_usuario}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
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
                    Nombre completo
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {fullName || 'No disponible'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {user.email}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Teléfono
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {user.telefono?.trim() || 'No registrado'}
                  </Typography>
                </Box>
                <Box>
                  <Chip
                    label={user.activo ? 'Activo' : 'Inactivo'}
                    size="small"
                    color={user.activo ? 'success' : 'error'}
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
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                >
                  Editar usuario
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserDetailPanel
