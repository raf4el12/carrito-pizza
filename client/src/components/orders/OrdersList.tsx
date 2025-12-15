import { Box, Stack, Typography } from '@mui/material'
import OrdersListTable from './components/OrdersListTable'
import OrderDetailPanel from './components/OrderDetailPanel'
import OrdersFilters from './components/OrdersFilters'
import ConfirmDeleteDialog from '../commons/ConfirmDeleteDialog'
import LoadingPage from '../commons/LoadingPage'
import { useOrdersListHook } from './hooks/useOrdersListHook'

const OrdersList = () => {
  const {
    orders,
    isLoading,
    error,
    hasOrders,
    filters,
    activeView,
    selectedOrder,
    isDeleteDialogOpen,
    isUpdating,
    isDeleting,
    handleView,
    handleBackToList,
    handleFilterChange,
    handleClearFilters,
    handleUpdateEstado,
    handleUpdateRepartidor,
    handleDelete,
    handleDeleteDialogClose,
    handleDeleteConfirm,
    refetch,
  } = useOrdersListHook()

  if (isLoading) {
    return <LoadingPage />
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error al cargar los pedidos</p>
      </div>
    )
  }

  return (
    <>
      <Box sx={{ p: { xs: 0, md: 1 } }}>
        {activeView === 'detail' && (
          <OrderDetailPanel
            order={selectedOrder}
            onBack={handleBackToList}
            onUpdateEstado={handleUpdateEstado}
            onUpdateRepartidor={handleUpdateRepartidor}
            isUpdating={isUpdating}
          />
        )}

        {activeView === 'list' && (
          <Stack spacing={3}>
            {/* Filtros */}
            <OrdersFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              onRefresh={() => refetch()}
            />

            {/* Tabla o mensaje vacío */}
            {!hasOrders ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No hay pedidos registrados
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Los pedidos realizados por los clientes aparecerán aquí
                </Typography>
              </Box>
            ) : (
              <OrdersListTable
                ordersData={orders}
                onView={handleView}
                onDelete={handleDelete}
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

export default OrdersList
