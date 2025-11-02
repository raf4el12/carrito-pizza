import { Add as AddIcon } from '@mui/icons-material'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import UserAddDrawer from './components/UserAddDrawer'
import UserDetailPanel from './components/UserDetailPanel'
import UserEditDrawer from './components/UserEditDrawer'
import UserListTable from './components/UserListTable'
import UserCard from './components/UserCard'
import ConfirmDeleteDialog from '../commons/ConfirmDeleteDialog'
import LoadingPage from '../commons/LoadingPage'
import { useUsersListHook } from './hooks/useUsersListHook'

const UsersList = () => {
  const {
    users,
    isLoading,
    error,
    hasUsers,
    activeView,
    viewMode,
    selectedUser,
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
  } = useUsersListHook()

  if (isLoading) {
    return <LoadingPage />
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error al cargar los usuarios</p>
      </div>
    )
  }

  return (
    <>
      <Box sx={{ p: { xs: 0, md: 1 } }}>
        {activeView === 'detail' && (
          <UserDetailPanel
            user={selectedUser}
            onBack={handleBackToList}
            onEdit={handleEditFromDetail}
          />
        )}

        {activeView === 'create' && (
          <UserAddDrawer onBack={handleBackToList} onSuccess={handleCreateSuccess} />
        )}

        {activeView === 'edit' && (
          <UserEditDrawer
            user={selectedUser}
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
                Agregar usuario
              </Button>
            </Box>

            {!hasUsers ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No hay usuarios registrados
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Crea tu primer usuario para comenzar
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
                  Crear usuario
                </Button>
              </Box>
            ) : viewMode === 'cards' ? (
              <Grid container spacing={3}>
                {users?.map((user) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={user.id_usuario}>
                    <UserCard
                      item={user}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onView={handleView}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <UserListTable
                userData={users}
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

export default UsersList
