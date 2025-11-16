'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSizesCreate } from '../../../hook/sizes/useSizesCreate'
import type { Size } from '../../../types/sizes/sizes.schema'
import { sizeCreateSchema, type SizeCreateDto } from '../../../types/sizes/sizes.schema'

interface UseCreateSizeFormParams {
  onSuccess?: (size: Size) => void
}

export const useCreateSizeForm = ({ onSuccess }: UseCreateSizeFormParams = {}) => {
  const form = useForm<SizeCreateDto>({
    resolver: zodResolver(sizeCreateSchema),
    defaultValues: {
      nombre: '',
      descripcion: null,
      precio_base: 0,
      activo: true,
    },
  })

  const mutation = useSizesCreate()

  const onSubmit = form.handleSubmit(async (values) => {
    const created = await mutation.mutateAsync({
      ...values,
      precio_base: Number(values.precio_base),
    })
    form.reset()
    onSuccess?.(created)
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

export type UseCreateSizeFormReturn = ReturnType<typeof useCreateSizeForm>


