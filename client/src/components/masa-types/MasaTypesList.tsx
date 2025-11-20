'use client'

import { Add as AddIcon } from '@mui/icons-material'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import ConfirmDeleteDialog from '../commons/ConfirmDeleteDialog'
import LoadingPage from '../commons/LoadingPage'
import type { MasaType } from '../../types/masa-types/masa-types.schema'
import { useMasaTypesDelete } from '../../hook/masa-types/useMasaTypesDelete'
import MasaTypeCard from './components/MasaTypeCard'
import MasaTypesListTable from './components/MasaTypesListTable'
import MasaTypesAddDrawer from './components/MasaTypesAddDrawer'
import MasaTypesEditDrawer from './components/MasaTypesEditDrawer'
import { useMasaTypesListHook } from './hooks/useMasaTypesListHook'

const MasaTypesList = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table')
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedMasaType, setSelectedMasaType] = useState<MasaType | null>(null)

  const { masaTypes, isLoading, error, hasMasaTypes, globalFilter, handleGlobalFilterChange } =
    useMasaTypesListHook()
  const deleteMasaType = useMasaTypesDelete()

  const handleAdd = () => {
    setSelectedMasaType(null)
    setIsAddDrawerOpen(true)
  }

  const handleEdit = (masaType: MasaType) => {
    setSelectedMasaType(masaType)
    setIsEditDrawerOpen(true)
  }

  const handleDelete = (masaType: MasaType) => {
    setSelectedMasaType(masaType)
    setIsDeleteDialogOpen(true)
  }

  const handleCloseAddDrawer = () => setIsAddDrawerOpen(false)

  const handleCloseEditDrawer = () => {
    setIsEditDrawerOpen(false)
    setSelectedMasaType(null)
  }

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false)
    setSelectedMasaType(null)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedMasaType) return
    await deleteMasaType.mutateAsync(selectedMasaType.id_tipo_masa)
    handleCloseDeleteDialog()
  }

  if (isLoading) return <LoadingPage />

  if (error) {
    return (
      <Box className="bg-red-50 border border-red-200 rounded-lg p-4">
        <Typography color="error">Error al cargar los tipos de masa.</Typography>
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
            Agregar tipo de masa
          </Button>
        </Box>

        {!hasMasaTypes ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hay tipos de masa registrados
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Crea tu primer tipo de masa para comenzar
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
              Crear tipo de masa
            </Button>
          </Box>
        ) : viewMode === 'cards' ? (
          <Grid container spacing={3}>
            {masaTypes.map((masaType) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={masaType.id_tipo_masa}>
                <MasaTypeCard item={masaType} onEdit={handleEdit} onDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <MasaTypesListTable
            data={masaTypes}
            globalFilter={globalFilter}
            onGlobalFilterChange={handleGlobalFilterChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <MasaTypesAddDrawer open={isAddDrawerOpen} onClose={handleCloseAddDrawer} />

        <MasaTypesEditDrawer
          open={isEditDrawerOpen}
          onClose={handleCloseEditDrawer}
          masaType={selectedMasaType}
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

export default MasaTypesList


