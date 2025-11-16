'use client'

import { useCallback, useMemo } from 'react'
import type { ChipProps } from '@mui/material/Chip'
import type { Product } from '../../../types/products/products.schema'
import { resolveImageUrl } from '../../../shared/utils/media'

interface UseProductDetailHookParams {
  product: Product | null
  onEdit?: (product: Product) => void
}

const getStatusChipColor = (estado: Product['estado']): ChipProps['color'] => {
  switch (estado) {
    case 'activo':
      return 'success'
    case 'inactivo':
      return 'error'
    default:
      return 'default'
  }
}

export const useProductDetailHook = ({ product, onEdit }: UseProductDetailHookParams) => {
  const hasProduct = !!product

  const formattedDate = useMemo(() => {
    if (!product?.fecha_creacion) return ''
    return new Date(product.fecha_creacion).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [product?.fecha_creacion])

  const statusColor = useMemo<ChipProps['color']>(() => {
    return product ? getStatusChipColor(product.estado) : 'default'
  }, [product])

  const categoryName = useMemo(() => {
    return product?.Categoria?.nombre_categoria || 'Sin categoría'
  }, [product])

  const imageUrl = useMemo(() => {
    return resolveImageUrl(product?.imagen_url ?? null)
  }, [product?.imagen_url])

  const hasImage = useMemo(() => {
    return !!imageUrl
  }, [imageUrl])

  const handleEdit = useCallback(() => {
    if (!product) return
    onEdit?.(product)
  }, [onEdit, product])

  return {
    hasProduct,
    formattedDate,
    statusColor,
    categoryName,
    hasImage,
    imageUrl,
    handleEdit,
  }
}

export type UseProductDetailHookReturn = ReturnType<typeof useProductDetailHook>
