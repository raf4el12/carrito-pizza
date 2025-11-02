'use client'

import { useCallback, useMemo, useState } from 'react'
import { useUsers } from '../../../hook/users/useUsers'
import { useUsersDelete } from '../../../hook/users/useUsersDelete'
import type { User } from '../../../types/user/user.schema'

type ActiveView = 'list' | 'detail' | 'create' | 'edit'

type ViewMode = 'cards' | 'table'

type EditOrigin = 'list' | 'detail'

export const useUsersListHook = () => {
  const [activeView, setActiveView] = useState<ActiveView>('list')
  const [viewMode, setViewMode] = useState<ViewMode>('cards')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editOrigin, setEditOrigin] = useState<EditOrigin>('list')

  const { data: users, isLoading, error } = useUsers()
  const deleteMutation = useUsersDelete()

  const hasUsers = useMemo(() => Array.isArray(users) && users.length > 0, [users])

  const handleAdd = useCallback(() => {
    setSelectedUser(null)
    setActiveView('create')
  }, [])

  const handleView = useCallback((user: User) => {
    setSelectedUser(user)
    setActiveView('detail')
  }, [])

  const handleBackToList = useCallback(() => {
    setActiveView('list')
    setSelectedUser(null)
    setEditOrigin('list')
  }, [])

  const handleEdit = useCallback(
    (user: User, origin: ActiveView = 'list') => {
      setSelectedUser(user)
      setEditOrigin(origin === 'detail' ? 'detail' : 'list')
      setActiveView('edit')
    },
    []
  )

  const handleEditFromDetail = useCallback(
    (user: User) => {
      handleEdit(user, 'detail')
    },
    [handleEdit]
  )

  const handleCreateSuccess = useCallback((user: User) => {
    setSelectedUser(user)
    setActiveView('detail')
    setEditOrigin('detail')
  }, [])

  const handleEditSuccess = useCallback((user: User) => {
    setSelectedUser(user)
    setActiveView('detail')
    setEditOrigin('detail')
  }, [])

  const handleDelete = useCallback((user: User) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }, [])

  const handleDeleteDialogClose = useCallback(() => {
    setIsDeleteDialogOpen(false)
    setSelectedUser((current) => (activeView === 'detail' ? current : null))
    setEditOrigin('list')
  }, [activeView])

  const handleDeleteConfirm = useCallback(async () => {
    if (!selectedUser) return

    try {
      await deleteMutation.mutateAsync(selectedUser.id_usuario)
      setIsDeleteDialogOpen(false)
      setSelectedUser(null)
      setActiveView('list')
      setEditOrigin('list')
    } catch (error) {
      // El hook de mutación ya gestiona el toast de error
    }
  }, [deleteMutation, selectedUser])

  const handleEditBack = useCallback(() => {
    if (editOrigin === 'detail' && selectedUser) {
      setActiveView('detail')
    } else {
      handleBackToList()
    }
  }, [editOrigin, handleBackToList, selectedUser])

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode)
  }, [])

  return {
    users,
    isLoading,
    error,
    hasUsers,
    activeView,
    viewMode,
    selectedUser,
    isDeleteDialogOpen,
    isDeleteLoading: deleteMutation.isPending,
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
  }
}

export type UseUsersListHookReturn = ReturnType<typeof useUsersListHook>
