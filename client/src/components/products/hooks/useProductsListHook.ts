'use client'

import { useCallback, useMemo, useState } from 'react'
import { useProducts } from '../../../hook/products/useProducts'
import { useProductsDelete } from '../../../hook/products/useProductsDelete'
import type { Product } from '../../../types/products/products.schema'

type ActiveView = 'list' | 'detail' | 'create' | 'edit'

type ViewMode = 'cards' | 'table'

type EditOrigin = 'list' | 'detail'

export const useProductsListHook = () => {
  const [activeView, setActiveView] = useState<ActiveView>('list')
  const [viewMode, setViewMode] = useState<ViewMode>('cards')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editOrigin, setEditOrigin] = useState<EditOrigin>('list')

  const { data: products, isLoading, error } = useProducts()
  const deleteMutation = useProductsDelete()

  const hasProducts = useMemo(
    () => Array.isArray(products) && products.length > 0,
    [products]
  )

  const handleAdd = useCallback(() => {
    setSelectedProduct(null)
    setActiveView('create')
  }, [])

  const handleView = useCallback((product: Product) => {
    setSelectedProduct(product)
    setActiveView('detail')
  }, [])

  const handleBackToList = useCallback(() => {
    setActiveView('list')
    setSelectedProduct(null)
    setEditOrigin('list')
  }, [])

  const handleEdit = useCallback(
    (product: Product, origin: ActiveView = 'list') => {
      setSelectedProduct(product)
      setEditOrigin(origin === 'detail' ? 'detail' : 'list')
      setActiveView('edit')
    },
    []
  )

  const handleEditFromDetail = useCallback(
    (product: Product) => {
      handleEdit(product, 'detail')
    },
    [handleEdit]
  )

  const handleCreateSuccess = useCallback((product: Product) => {
    setSelectedProduct(product)
    setActiveView('detail')
    setEditOrigin('detail')
  }, [])

  const handleEditSuccess = useCallback((product: Product) => {
    setSelectedProduct(product)
    setActiveView('detail')
    setEditOrigin('detail')
  }, [])

  const handleDelete = useCallback((product: Product) => {
    setSelectedProduct(product)
    setIsDeleteDialogOpen(true)
  }, [])

  const handleDeleteDialogClose = useCallback(() => {
    setIsDeleteDialogOpen(false)
    setSelectedProduct((current) => (activeView === 'detail' ? current : null))
    setEditOrigin('list')
  }, [activeView])

  const handleDeleteConfirm = useCallback(async () => {
    if (!selectedProduct) return

    try {
      await deleteMutation.mutateAsync(selectedProduct.id_producto)
      setIsDeleteDialogOpen(false)
      setSelectedProduct(null)
      setActiveView('list')
      setEditOrigin('list')
    } catch (error) {
      // El hook de mutación ya gestiona el toast de error
    }
  }, [deleteMutation, selectedProduct])

  const handleEditBack = useCallback(() => {
    if (editOrigin === 'detail' && selectedProduct) {
      setActiveView('detail')
    } else {
      handleBackToList()
    }
  }, [editOrigin, handleBackToList, selectedProduct])

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode)
  }, [])

  return {
    products,
    isLoading,
    error,
    hasProducts,
    activeView,
    viewMode,
    selectedProduct,
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

export type UseProductsListHookReturn = ReturnType<typeof useProductsListHook>
