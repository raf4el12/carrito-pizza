import { Add as AddIcon } from '@mui/icons-material'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import ProductAddDrawer from './components/ProductAddDrawer'
import ProductDetailPanel from './components/ProductDetailPanel'
import ProductEditDrawer from './components/ProductEditDrawer'
import ProductListTable from './components/ProductListTable'
import ProductCard from './components/ProductCard'
import ConfirmDeleteDialog from '../commons/ConfirmDeleteDialog'
import LoadingPage from '../commons/LoadingPage'
import { useProductsListHook } from './hooks/useProductsListHook'

const ProductsList = () => {
  const {
    products,
    isLoading,
    error,
    hasProducts,
    activeView,
    viewMode,
    selectedProduct,
    isDeleteDialogOpen,
    handleAdd,
    handleView,
    handleEdit,
    handleEditFromDetail,
    handleEditBack,
    handleBackToList,
    handleCreateSuccess,
    handleEditSuccess,
    handleDelete,
    handleDeleteDialogClose,
    handleDeleteConfirm,
    handleViewModeChange,
  } = useProductsListHook()

  if (isLoading) {
    return <LoadingPage />
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error al cargar los productos</p>
      </div>
    )
  }

  return (
    <>
      <Box sx={{ p: { xs: 0, md: 1 } }}>
        {activeView === 'detail' && (
          <ProductDetailPanel
            product={selectedProduct}
            onBack={handleBackToList}
            onEdit={handleEditFromDetail}
          />
        )}

        {activeView === 'create' && (
          <ProductAddDrawer onBack={handleBackToList} onSuccess={handleCreateSuccess} />
        )}

        {activeView === 'edit' && (
          <ProductEditDrawer
            product={selectedProduct}
            onBack={handleEditBack}
            onSuccess={handleEditSuccess}
          />
        )}

        {activeView === 'list' && (
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
                  onClick={() => handleViewModeChange('cards')}
                >
                  Vista tarjetas
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'contained' : 'outlined'}
                  size="small"
                  startIcon={<i className="ri-table-line" />}
                  onClick={() => handleViewModeChange('table')}
                >
                  Vista tabla
                </Button>
              </Stack>

              <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
                Agregar producto
              </Button>
            </Box>

            {!hasProducts ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No hay productos registrados
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Crea tu primer producto para comenzar
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
                  Crear producto
                </Button>
              </Box>
            ) : viewMode === 'cards' ? (
              <Grid container spacing={3}>
                {products?.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id_producto}>
                    <ProductCard
                      item={product}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onView={handleView}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <ProductListTable
                productData={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            )}
          </Stack>
        )}
      </Box>

      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}

export default ProductsList
