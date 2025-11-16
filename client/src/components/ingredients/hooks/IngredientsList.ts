'use client'

import { useCallback, useMemo, useState } from 'react'
import { useIngredients } from '../../../hook/ingredients/useIngredients'
import type { Ingredient } from '../../../types/ingredients/ingredients.schema'

export const useIngredientsListHook = () => {
  const { data, isLoading, error } = useIngredients()
  const ingredients = useMemo<Ingredient[]>(() => data ?? [], [data])
  const hasIngredients = ingredients.length > 0

  const [globalFilter, setGlobalFilter] = useState('')
  const handleGlobalFilterChange = useCallback((value: string | number) => {
    setGlobalFilter(String(value))
  }, [])

  return {
    ingredients,
    isLoading,
    error,
    hasIngredients,
    globalFilter,
    handleGlobalFilterChange,
  }
}

export type UseIngredientsListHookReturn = ReturnType<typeof useIngredientsListHook>

