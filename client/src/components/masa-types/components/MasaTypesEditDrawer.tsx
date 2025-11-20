'use client'

import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import type { MasaType } from '../../../types/masa-types/masa-types.schema'
import { useUpdateMasaTypeForm } from '../hooks/useUpdateMasaTypeForm'

interface MasaTypesEditDrawerProps {
  open: boolean
  onClose: () => void
  masaType: MasaType | null
  onSuccess?: (masaType: MasaType) => void
}

const MasaTypesEditDrawer = ({ open, onClose, masaType, onSuccess }: MasaTypesEditDrawerProps) => {
  const { form, onSubmit, isPending } = useUpdateMasaTypeForm({
    masaType,
    onSuccess: (updated) => {
      onSuccess?.(updated)
      onClose()
    },
  })

  const {
    register,
    formState: { errors },
    watch,
  } = form

  if (!masaType) return null

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 420 } },
      }}
    >
      <Box
        component='form'
        onSubmit={onSubmit}
        sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h6'>Editar tipo de masa</Typography>
          <IconButton onClick={onClose} size='small'>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Stack spacing={3} sx={{ flex: 1 }}>
          <TextField
            label='Nombre del tipo de masa'
            fullWidth
            autoFocus
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
            {...register('nombre')}
          />

          <TextField
            label='Descripción'
            fullWidth
            multiline
            rows={3}
            error={!!errors.descripcion}
            helperText={errors.descripcion?.message}
            {...register('descripcion')}
          />

          <TextField
            label='Precio adicional'
            type='number'
            fullWidth
            inputProps={{ min: 0, step: 0.1 }}
            InputProps={{
              startAdornment: <InputAdornment position='start'>S/</InputAdornment>,
            }}
            error={!!errors.precio_adicional}
            helperText={errors.precio_adicional?.message}
            {...register('precio_adicional', { valueAsNumber: true })}
          />

          <FormControlLabel
            control={
              <Switch color='primary' checked={Boolean(watch('activo'))} {...register('activo')} />
            }
            label='Tipo de masa activo'
          />
        </Stack>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant='outlined' onClick={onClose} fullWidth disabled={isPending}>
            Cancelar
          </Button>
          <Button variant='contained' type='submit' fullWidth disabled={isPending}>
            {isPending ? 'Actualizando...' : 'Guardar cambios'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default MasaTypesEditDrawer


