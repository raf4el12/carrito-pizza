'use client'

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  TextField,
  Button,
  InputAdornment,
  FormControlLabel,
  Switch,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useCreateIngredientForm } from '../hooks/useCreateIngredientForm'
import type { Ingredient } from '../../../types/ingredients/ingredients.schema'

interface IngredientsAddDrawerProps {
  open: boolean
  onClose: () => void
  onSuccess?: (ingredient: Ingredient) => void
}

const IngredientsAddDrawer = ({ open, onClose, onSuccess }: IngredientsAddDrawerProps) => {
  const { form, onSubmit, isPending } = useCreateIngredientForm({
    onSuccess: (ingredient) => {
      onClose()
      onSuccess?.(ingredient)
    },
  })

  const {
    register,
    formState: { errors },
    watch,
  } = form

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
          <Typography variant="h6">Nuevo ingrediente</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Stack spacing={3} sx={{ flex: 1 }}>
          <TextField
            label="Nombre del ingrediente"
            placeholder="Ej. Jamón ahumado"
            autoFocus
            fullWidth
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
            control={<Switch color="primary" checked={watch('activo')} {...register('activo')} />}
            label="Ingrediente activo"
          />
        </Stack>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            fullWidth
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={isPending}
          >
            {isPending ? 'Guardando...' : 'Guardar'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default IngredientsAddDrawer

