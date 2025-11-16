'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Ingredient, UpdateIngredientInput } from '../../../types/ingredients/ingredients.schema'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UpdateIngredientSchema } from '../../../types/ingredients/ingredients.schema'
import { useIngredientsUpdate } from '../../../hook/ingredients/useIngredientsUpdate'

interface UseUpdateIngredientFormParams {
  ingredient: Ingredient | null
  onSuccess?: (ingredient: Ingredient) => void
}

export const useUpdateIngredientForm = ({
  ingredient,
  onSuccess,
}: UseUpdateIngredientFormParams) => {
  const updateIngredient = useIngredientsUpdate()

  const form = useForm<UpdateIngredientInput>({
    resolver: zodResolver(UpdateIngredientSchema),
    defaultValues: {
      nombre: '',
      precio_adicional: 0,
      stock_disponible: 0,
      activo: true,
    },
  })

  useEffect(() => {
    if (ingredient) {
      form.reset({
        nombre: ingredient.nombre,
        precio_adicional: ingredient.precio_adicional,
        stock_disponible: ingredient.stock_disponible,
        activo: ingredient.activo,
      })
    }
  }, [form, ingredient])

  const onSubmit = form.handleSubmit(async (values) => {
    if (!ingredient) return

    const updated = await updateIngredient.mutateAsync({
      id: ingredient.id_ingrediente,
      data: values,
    })

    onSuccess?.(updated)
  })

  return {
    form,
    onSubmit,
    isPending: updateIngredient.isPending,
    isSuccess: updateIngredient.isSuccess,
    isError: updateIngredient.isError,
    error: updateIngredient.error,
  }
}

export type UseUpdateIngredientFormReturn = ReturnType<
  typeof useUpdateIngredientForm
>

