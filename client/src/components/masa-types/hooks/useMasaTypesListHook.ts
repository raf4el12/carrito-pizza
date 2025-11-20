'use client'

import { useCallback, useMemo, useState } from 'react'
import { useMasaTypes } from '../../../hook/masa-types/useMasaTypes'
import type { MasaType } from '../../../types/masa-types/masa-types.schema'

export const useMasaTypesListHook = () => {
  const { data, isLoading, error } = useMasaTypes()

  const masaTypes = useMemo<MasaType[]>(() => data ?? [], [data])
  const hasMasaTypes = masaTypes.length > 0

  const [globalFilter, setGlobalFilter] = useState('')

  const handleGlobalFilterChange = useCallback((value: string | number) => {
    setGlobalFilter(String(value))
  }, [])

  return {
    masaTypes,
    isLoading,
    error,
    hasMasaTypes,
    globalFilter,
    handleGlobalFilterChange,
  }
}

export type UseMasaTypesListHookReturn = ReturnType<typeof useMasaTypesListHook>


