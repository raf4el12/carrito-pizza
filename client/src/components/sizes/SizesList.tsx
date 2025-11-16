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
import ConfirmDeleteDialog from '../commons/ConfirmDeleteDialog'
import LoadingPage from '../commons/LoadingPage'
import SizesListTable from './components/SizesListTable'
import SizesCard from './components/SizesCard'
import SizesAddDrawer from './components/SizesAddDrawer'
import SizesEditDrawer from './components/SizesEditDrawer'
import { useSizesListHook } from './hooks/useSizesListHook'
import type { Size } from '../../types/sizes/sizes.schema'
import { useSizesDelete } from '../../hook/sizes/useSizesDelete'

const SizesList = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table')
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)

  const { sizes, isLoading, error, hasSizes, globalFilter, handleGlobalFilterChange } =
    useSizesListHook()
  const deleteSize = useSizesDelete()

  const handleAdd = () => {
    setSelectedSize(null)
    setIsAddDrawerOpen(true)
  }

  const handleEdit = (size: Size) => {
    setSelectedSize(size)
    setIsEditDrawerOpen(true)
  }

  const handleDelete = (size: Size) => {
    setSelectedSize(size)
    setIsDeleteDialogOpen(true)
  }

  const handleCloseAddDrawer = () => setIsAddDrawerOpen(false)

  const handleCloseEditDrawer = () => {
    setIsEditDrawerOpen(false)
    setSelectedSize(null)
  }

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false)
    setSelectedSize(null)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedSize) return
    await deleteSize.mutateAsync(selectedSize.id_tamano)
    handleCloseDeleteDialog()
  }

  if (isLoading) return <LoadingPage />

  if (error) {
    return (
      <Box className="bg-red-50 border border-red-200 rounded-lg p-4">
        <Typography color="error">Error al cargar los tamaños.</Typography>
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

          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
            Agregar tamaño
          </Button>
        </Box>

        {!hasSizes ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hay tamaños registrados
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Crea tu primer tamaño para comenzar
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
              Crear tamaño
            </Button>
          </Box>
        ) : viewMode === 'cards' ? (
          <Grid container spacing={3}>
            {sizes.map((size) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={size.id_tamano}>
                <SizesCard item={size} onEdit={handleEdit} onDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <SizesListTable
            data={sizes}
            globalFilter={globalFilter}
            onGlobalFilterChange={handleGlobalFilterChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <SizesAddDrawer open={isAddDrawerOpen} onClose={handleCloseAddDrawer} />

        <SizesEditDrawer open={isEditDrawerOpen} onClose={handleCloseEditDrawer} size={selectedSize} />

        <ConfirmDeleteDialog
          open={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleDeleteConfirm}
        />
      </Stack>
    </Box>
  )
}

export default SizesList


