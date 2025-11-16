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
import type { Ingredient } from '../../../types/ingredients/ingredients.schema'
import { useUpdateIngredientForm } from '../hooks/useUpdateIngredientForm'

interface IngredientsEditDrawerProps {
  open: boolean
  onClose: () => void
  ingredient: Ingredient | null
  onSuccess?: (ingredient: Ingredient) => void
}

const IngredientsEditDrawer = ({
  open,
  onClose,
  ingredient,
  onSuccess,
}: IngredientsEditDrawerProps) => {
  const {
    form,
    onSubmit,
    isPending,
  } = useUpdateIngredientForm({
    ingredient,
    onSuccess: (updated) => {
      onSuccess?.(updated)
      onClose()
    },
  })

  const {
    register,
    formState: { errors },
  } = form

  if (!ingredient) return null

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 420 } },
      }}
    >
      <Box
        component="form"
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
          <Typography variant="h6">Editar ingrediente</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Stack spacing={3} sx={{ flex: 1 }}>
          <TextField
            label="Nombre del ingrediente"
            fullWidth
            autoFocus
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
            {...register('nombre')}
          />

          <TextField
            label="Precio adicional"
            type="number"
            fullWidth
            inputProps={{ min: 0, step: 0.1 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">S/</InputAdornment>,
            }}
            error={!!errors.precio_adicional}
            helperText={errors.precio_adicional?.message}
            {...register('precio_adicional', { valueAsNumber: true })}
          />

          <TextField
            label="Stock disponible"
            type="number"
            fullWidth
            inputProps={{ min: 0, step: 1 }}
            error={!!errors.stock_disponible}
            helperText={errors.stock_disponible?.message}
            {...register('stock_disponible', { valueAsNumber: true })}
          />

          <FormControlLabel
            control={<Switch color="primary" {...register('activo')} />}
            label="Ingrediente activo"
          />
        </Stack>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={onClose} fullWidth disabled={isPending}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit" fullWidth disabled={isPending}>
            {isPending ? 'Actualizando...' : 'Guardar cambios'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default IngredientsEditDrawer

