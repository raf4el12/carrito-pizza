'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMasaTypesUpdate } from '../../../hook/masa-types/useMasaTypesUpdate'
import type { MasaType, MasaTypeUpdateDto } from '../../../types/masa-types/masa-types.schema'
import { masaTypeUpdateSchema } from '../../../types/masa-types/masa-types.schema'

interface UseUpdateMasaTypeFormParams {
  masaType: MasaType | null
  onSuccess?: (size: MasaType) => void
}

export const useUpdateMasaTypeForm = ({ masaType, onSuccess }: UseUpdateMasaTypeFormParams) => {
  const form = useForm<MasaTypeUpdateDto>({
    resolver: zodResolver(masaTypeUpdateSchema),
    defaultValues: {
      nombre: '',
      descripcion: null,
      precio_adicional: 0,
      activo: true,
    },
  })

  const updateMutation = useMasaTypesUpdate()

  useEffect(() => {
    if (masaType) {
      form.reset({
        nombre: masaType.nombre,
        descripcion: masaType.descripcion,
        precio_adicional: masaType.precio_adicional,
        activo: masaType.activo,
      })
    }
  }, [form, masaType])

  const onSubmit = form.handleSubmit(async (values) => {
    if (!masaType) return
    const updated = await updateMutation.mutateAsync({
      id: masaType.id_tipo_masa,
      data: {
        ...values,
        precio_adicional: values.precio_adicional,
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

export type UseUpdateMasaTypeFormReturn = ReturnType<typeof useUpdateMasaTypeForm>


