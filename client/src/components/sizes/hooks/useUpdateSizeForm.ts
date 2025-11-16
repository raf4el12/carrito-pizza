'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { Size, SizeUpdateDto } from '../../../types/sizes/sizes.schema'
import { sizeUpdateSchema } from '../../../types/sizes/sizes.schema'
import { useSizesUpdate } from '../../../hook/sizes/useSizesUpdate'

interface UseUpdateSizeFormParams {
  size: Size | null
  onSuccess?: (size: Size) => void
}

export const useUpdateSizeForm = ({ size, onSuccess }: UseUpdateSizeFormParams) => {
  const form = useForm<SizeUpdateDto>({
    resolver: zodResolver(sizeUpdateSchema),
    defaultValues: {
      nombre: '',
      descripcion: null,
      precio_base: 0,
      activo: true,
    },
  })

  const updateMutation = useSizesUpdate()

  useEffect(() => {
    if (size) {
      form.reset({
        nombre: size.nombre,
        descripcion: size.descripcion,
        precio_base: size.precio_base,
        activo: size.activo,
      })
    }
  }, [form, size])

  const onSubmit = form.handleSubmit(async (values) => {
    if (!size) return
    const updated = await updateMutation.mutateAsync({
      id: size.id_tamano,
      data: {
        ...values,
        precio_base: values.precio_base,
      },
    })
    onSuccess?.(updated)
  })

  return {
    form,
    onSubmit,
    isPending: updateMutation.isPending,
    isSuccess: updateMutation.isSuccess,
    isError: updateMutation.isError,
    error: updateMutation.error,
  }
}

export type UseUpdateSizeFormReturn = ReturnType<typeof useUpdateSizeForm>


