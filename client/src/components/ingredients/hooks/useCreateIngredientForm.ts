'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import ApiBackend from '../../../shared/services/api.backend'
import type {
  CreateIngredientInput,
  Ingredient,
} from '../../../types/ingredients/ingredients.schema'
import { CreateIngredientSchema } from '../../../types/ingredients/ingredients.schema'

interface UseCreateIngredientFormParams {
  onSuccess?: (ingredient: Ingredient) => void
}

export const useCreateIngredientForm = ({
  onSuccess,
}: UseCreateIngredientFormParams = {}) => {
  const queryClient = useQueryClient()

  const form = useForm<CreateIngredientInput>({
    resolver: zodResolver(CreateIngredientSchema),
    defaultValues: {
      nombre: '',
      precio_adicional: 0,
      stock_disponible: 0,
      activo: true,
    },
  })

  const mutation = useMutation({
    mutationFn: async (payload: CreateIngredientInput) => {
      const response = await ApiBackend.post<Ingredient>('/ingredients', payload)
      return response
    },
    onSuccess: (ingredient) => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] })
      form.reset()
      onSuccess?.(ingredient)
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values)
  })

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  }
}

export type UseCreateIngredientFormReturn = ReturnType<
  typeof useCreateIngredientForm
>

