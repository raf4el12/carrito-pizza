'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveIcon from '@mui/icons-material/Save'
import {
  Avatar,
  Box,
  Button,
  Card,
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
import type { User } from '../../../types/user/user.schema'
import { useUserEditHook } from '../hooks/useUserEditHook'

interface UserEditDrawerProps {
  user: User | null
  onBack: () => void
  onSuccess?: (user: User) => void
}

const UserEditDrawer = ({ user, onBack, onSuccess }: UserEditDrawerProps) => {
  const {
    hasUser,
    formData,
    errors,
    initials,
    isSubmitting,
    canSubmit,
    handleInputChange,
    handleRoleChange,
    handleStatusChange,
    handleSubmit,
    handleBack,
  } = useUserEditHook({ user, onBack, onSuccess })

  if (!hasUser) return null

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 3 }}>
          Volver
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
              Editar usuario
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Actualiza la información del usuario seleccionado.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Chip label={formData.rol} size="small" color="primary" variant="outlined" />
              <Chip
                label={formData.activo ? 'Activo' : 'Inactivo'}
                size="small"
                color={formData.activo ? 'success' : 'error'}
              />
            </Box>
          </Box>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <Card sx={{ overflow: 'hidden' }}>
              <Box
                sx={{
                  height: 220,
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Avatar
                  sx={{
                    width: 140,
                    height: 140,
                    bgcolor: 'white',
                    color: 'primary.main',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                  }}
                >
                  {initials || 'US'}
                </Avatar>
              </Box>
            </Card>

            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Datos personales
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    value={formData.nombre}
                    onChange={handleInputChange('nombre')}
                    error={!!errors.nombre}
                    helperText={errors.nombre}
                    required
                    inputProps={{ maxLength: 100 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    value={formData.apellido}
                    onChange={handleInputChange('apellido')}
                    error={!!errors.apellido}
                    helperText={errors.apellido}
                    required
                    inputProps={{ maxLength: 100 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={formData.username}
                    onChange={handleInputChange('username')}
                    error={!!errors.username}
                    helperText={errors.username}
                    required
                    inputProps={{ maxLength: 255 }}
                  />
                </Grid>
              </Grid>
            </Card>

            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Información de contacto
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    value={formData.telefono}
                    onChange={handleInputChange('telefono')}
                    inputProps={{ maxLength: 20 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    value={formData.direccion}
                    onChange={handleInputChange('direccion')}
                    multiline
                    rows={2}
                    inputProps={{ maxLength: 255 }}
                  />
                </Grid>
              </Grid>
            </Card>

            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Configuración
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Rol</InputLabel>
                    <Select
                      value={formData.rol}
                      label="Rol"
                      onChange={handleRoleChange}
                    >
                      <MenuItem value="cliente">Cliente</MenuItem>
                      <MenuItem value="administrador">Administrador</MenuItem>
                      <MenuItem value="repartidor">Repartidor</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={formData.activo ? 'activo' : 'inactivo'}
                      label="Estado"
                      onChange={handleStatusChange}
                    >
                      <MenuItem value="activo">Activo</MenuItem>
                      <MenuItem value="inactivo">Inactivo</MenuItem>
                    </Select>
                  </FormControl>
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
                    Nombre completo
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {`${formData.nombre} ${formData.apellido}`.trim() || 'No disponible'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formData.email || 'No registrado'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Rol
                  </Typography>
                  <Chip label={formData.rol} size="small" color="primary" variant="outlined" />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Estado
                  </Typography>
                  <Chip
                    label={formData.activo ? 'Activo' : 'Inactivo'}
                    size="small"
                    color={formData.activo ? 'success' : 'error'}
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
                  {isSubmitting ? 'Actualizando...' : 'Actualizar usuario'}
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

export default UserEditDrawer
