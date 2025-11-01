import { useState } from 'react'
import { Add as AddIcon } from '@mui/icons-material'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import CategoryAddDrawer from './components/CategoryAddDrawer'
import CategoryCard from './components/CategoryCard'
import CategoryDetailDrawer from './components/CategoryDetailDrawer'
import CategoryEditDrawer from './components/CategoryEditDrawer'
import CategoryListTable from './components/CategoryListTable'
import ConfirmDeleteDialog from '../commons/ConfirmDeleteDialog'
import LoadingPage from '../commons/LoadingPage'
import { useCategories } from '../../hook/categories/useCategories'
import { useCategoriesDelete } from '../../hook/categories/useCategoriesDelete'
import type { Category } from '../../types/categories/categories.schema'

const CategoriesList = () => {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')

  const { data: categories, isLoading, error } = useCategories()
  const deleteMutation = useCategoriesDelete()

  const handleAdd = () => {
    setIsAddDrawerOpen(true)
  }

  const handleEdit = (category: Category) => {
    setSelectedCategory(category)
    setIsEditDrawerOpen(true)
  }

  const handleDelete = (category: Category) => {
    setSelectedCategory(category)
    setIsDeleteDialogOpen(true)
  }

  const handleView = (category: Category) => {
    setSelectedCategory(category)
    setIsDetailDrawerOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedCategory) return
    try {
      await deleteMutation.mutateAsync(selectedCategory.id_categoria)
      setIsDeleteDialogOpen(false)
      setSelectedCategory(null)
    } catch (error) {
      // El error ya se maneja en el hook con toast
    }
  }

  if (isLoading) {
    return <LoadingPage />
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error al cargar las categorías</p>
      </div>
    )
  }

  return (
    <>
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
              Agregar categoría
            </Button>
          </Box>

          {Array.isArray(categories) && categories.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No hay categorías registradas
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Crea tu primera categoría para comenzar
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
              >
                Crear categoría
              </Button>
            </Box>
          ) : viewMode === 'cards' ? (
            <Grid container spacing={3}>
              {categories?.map((category) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={category.id_categoria}>
                  <CategoryCard
                    item={category}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <CategoryListTable
              categoryData={categories}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </Stack>
      </Box>

      <CategoryAddDrawer
        open={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
      />

      <CategoryEditDrawer
        open={isEditDrawerOpen}
        onClose={() => {
          setIsEditDrawerOpen(false)
          setSelectedCategory(null)
        }}
        category={selectedCategory}
      />

      <CategoryDetailDrawer
        open={isDetailDrawerOpen}
        onClose={() => {
          setIsDetailDrawerOpen(false)
          setSelectedCategory(null)
        }}
        onEdit={handleEdit}
        category={selectedCategory}
      />

      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedCategory(null)
        }}
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}

export default CategoriesList

