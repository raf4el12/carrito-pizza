'use client'

import { Add as AddIcon } from '@mui/icons-material'
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import IngredientsListTable from './components/IngredientsListTable'
import IngredientsCard from './components/IngredientsCard'
import LoadingPage from '../commons/LoadingPage'
import ConfirmDeleteDialog from '../commons/ConfirmDeleteDialog'
import { useIngredientsListHook } from './hooks/IngredientsList'
import IngredientsAddDrawer from './components/IngredientsAddDrawer'
import type { Ingredient } from '../../types/ingredients/ingredients.schema'
import IngredientsEditDrawer from './components/IngredientsEditDrawer'
import { useIngredientsDelete } from '../../hook/ingredients/useIngredientsDelete'

const IngredientsList = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table')
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null)

  const deleteIngredient = useIngredientsDelete()

  const {
    ingredients,
    isLoading,
    error,
    hasIngredients,
    globalFilter,
    handleGlobalFilterChange,
  } = useIngredientsListHook()

  const handleAdd = () => {
    setSelectedIngredient(null)
    setIsAddDrawerOpen(true)
  }

  const handleEdit = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient)
    setIsEditDrawerOpen(true)
  }

  const handleDelete = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient)
    setIsDeleteDialogOpen(true)
  }

  const handleCloseAddDrawer = () => {
    setIsAddDrawerOpen(false)
  }

  const handleCloseEditDrawer = () => {
    setIsEditDrawerOpen(false)
    setSelectedIngredient(null)
  }

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false)
    setSelectedIngredient(null)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedIngredient) return
    try {
      await deleteIngredient.mutateAsync(selectedIngredient.id_ingrediente)
    } finally {
      setIsDeleteDialogOpen(false)
      setSelectedIngredient(null)
    }
  }

  if (isLoading) return <LoadingPage />

  if (error) {
    return (
      <Box className="bg-red-50 border border-red-200 rounded-lg p-4">
        <Typography color="error">Error al cargar los ingredientes.</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: { xs: 0, md: 1 } }}>
      <Stack spacing={3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
          }}
        >
          <Stack direction="row" spacing={1}>
            <Button
              variant={viewMode === 'cards' ? 'contained' : 'outlined'}
              size="small"
              startIcon={<i className="ri-layout-grid-line" />}
              onClick={() => setViewMode('cards')}
            >
              Vista tarjetas
            </Button>
            <Button
              variant={viewMode === 'table' ? 'contained' : 'outlined'}
              size="small"
              startIcon={<i className="ri-table-line" />}
              onClick={() => setViewMode('table')}
            >
              Vista tabla
            </Button>
          </Stack>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Agregar ingrediente
          </Button>
        </Box>

        {!hasIngredients ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hay ingredientes registrados
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Crea tu primer ingrediente para comenzar
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
              Crear ingrediente
            </Button>
          </Box>
        ) : viewMode === 'cards' ? (
          <Grid container spacing={3}>
            {ingredients.map((ingredient) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={ingredient.id_ingrediente}>
                <IngredientsCard
                  item={ingredient}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <IngredientsListTable
            data={ingredients}
            globalFilter={globalFilter}
            onGlobalFilterChange={handleGlobalFilterChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <IngredientsAddDrawer
          open={isAddDrawerOpen}
          onClose={handleCloseAddDrawer}
        />

        <IngredientsEditDrawer
          open={isEditDrawerOpen}
          onClose={handleCloseEditDrawer}
          ingredient={selectedIngredient}
        />

        <ConfirmDeleteDialog
          open={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleDeleteConfirm}
        />
      </Stack>
    </Box>
  )
}

export default IngredientsList
