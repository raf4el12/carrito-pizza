'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMasaTypesCreate } from '../../../hook/masa-types/useMasaTypesCreate'
import type { MasaType } from '../../../types/masa-types/masa-types.schema'
import {
  masaTypeCreateSchema,
  type MasaTypeCreateDto,
} from '../../../types/masa-types/masa-types.schema'

interface UseCreateMasaTypeFormParams {
  onSuccess?: (masaType: MasaType) => void
}

export const useCreateMasaTypeForm = ({ onSuccess }: UseCreateMasaTypeFormParams = {}) => {
  const form = useForm<MasaTypeCreateDto>({
    resolver: zodResolver(masaTypeCreateSchema),
    defaultValues: {
      nombre: '',
      descripcion: null,
      precio_adicional: 0,
      activo: true,
    },
  })

  const mutation = useMasaTypesCreate()

  const onSubmit = form.handleSubmit(async (values) => {
    const created = await mutation.mutateAsync({
      ...values,
      precio_adicional: Number(values.precio_adicional),
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

export type UseCreateMasaTypeFormReturn = ReturnType<typeof useCreateMasaTypeForm>


