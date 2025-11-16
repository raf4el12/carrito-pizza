'use client'

import { useCallback, useMemo, useState } from 'react'
import { useSizes } from '../../../hook/sizes/useSizes'
import type { Size } from '../../../types/sizes/sizes.schema'

export const useSizesListHook = () => {
  const { data, isLoading, error } = useSizes()

  const sizes = useMemo<Size[]>(() => data ?? [], [data])
  const hasSizes = sizes.length > 0

  const [globalFilter, setGlobalFilter] = useState('')

  const handleGlobalFilterChange = useCallback((value: string | number) => {
    setGlobalFilter(String(value))
  }, [])

  return {
    sizes,
    isLoading,
    error,
    hasSizes,
    globalFilter,
    handleGlobalFilterChange,
  }
}

export type UseSizesListHookReturn = ReturnType<typeof useSizesListHook>


