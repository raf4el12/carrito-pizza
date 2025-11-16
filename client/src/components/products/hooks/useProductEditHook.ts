'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from 'react'
import type { SelectChangeEvent } from '@mui/material/Select'
import { useProductsUpdate } from '../../../hook/products/useProductsUpdate'
import type { Product } from '../../../types/products/products.schema'
import { isValidHttpUrl } from '../../../shared/utils/url'

interface UseProductEditHookParams {
  product: Product | null
  onBack: () => void
  onSuccess?: (product: Product) => void
}

interface EditFormState {
  nombre: string
  descripcion: string
  id_categoria: number | ''
  imagen_url: string
  estado: 'activo' | 'inactivo'
}

const emptyFormState: EditFormState = {
  nombre: '',
  descripcion: '',
  id_categoria: '',
  imagen_url: '',
  estado: 'activo',
}

type FormErrors = Partial<Record<'nombre' | 'id_categoria' | 'imagen_url', string>>

export const useProductEditHook = ({
  product,
  onBack,
  onSuccess,
}: UseProductEditHookParams) => {
  const [formData, setFormData] = useState<EditFormState>(emptyFormState)
  const [errors, setErrors] = useState<FormErrors>({})
  const updateProduct = useProductsUpdate()

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre ?? '',
        descripcion: product.descripcion ?? '',
        id_categoria: product.id_categoria ?? '',
        imagen_url: product.imagen_url ?? '',
        estado: product.estado ?? 'activo',
      })
      setErrors({})
    } else {
      setFormData(emptyFormState)
      setErrors({})
    }
  }, [product])

  const resetForm = useCallback(() => {
    setFormData(emptyFormState)
    setErrors({})
  }, [])

  const handleInputChange = useCallback(
    (field: keyof EditFormState) =>
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value
        setFormData((prev) => ({ ...prev, [field]: value }))

        if (field === 'nombre' || field === 'id_categoria' || field === 'imagen_url') {
          setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
      },
    []
  )

  const handleCategoryChange = useCallback(
    (event: SelectChangeEvent<number | ''>) => {
      const value = event.target.value
      setFormData((prev) => ({ ...prev, id_categoria: value === '' ? '' : Number(value) }))
      setErrors((prev) => ({ ...prev, id_categoria: undefined }))
    },
    []
  )

  const handleStatusChange = useCallback(
    (event: SelectChangeEvent<EditFormState['estado']>) => {
      const value = event.target.value as EditFormState['estado']
      setFormData((prev) => ({ ...prev, estado: value }))
    },
    []
  )

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre del producto es requerido'
    }

    if (formData.id_categoria === '') {
      newErrors.id_categoria = 'La categoría es requerida'
    }

    const trimmedImageUrl = formData.imagen_url.trim()
    if (trimmedImageUrl && !isValidHttpUrl(trimmedImageUrl)) {
      newErrors.imagen_url = 'Ingresa un enlace válido (http/https)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleBack = useCallback(() => {
    resetForm()
    onBack()
  }, [onBack, resetForm])

  const handleSubmit = useCallback(async () => {
    if (!product) return
    if (!validateForm()) return

    try {
      const updatedProduct = await updateProduct.mutateAsync({
        id: product.id_producto,
        data: {
          nombre: formData.nombre.trim(),
          descripcion: formData.descripcion.trim() || null,
          id_categoria: formData.id_categoria as number,
          imagen_url: formData.imagen_url.trim() || null,
          estado: formData.estado,
        },
      })

      resetForm()

      if (updatedProduct) {
        onSuccess?.(updatedProduct)
      }

      if (!onSuccess || !updatedProduct) {
        onBack()
      }
    } catch (error) {
      // El hook de mutación gestiona el toast de error
    }
  }, [
    formData.descripcion,
    formData.estado,
    formData.id_categoria,
    formData.imagen_url,
    formData.nombre,
    onBack,
    onSuccess,
    product,
    resetForm,
    updateProduct,
    validateForm,
  ])

  const isSubmitting = updateProduct.isPending

  const canSubmit = useMemo(() => {
    return !!formData.nombre.trim() && formData.id_categoria !== ''
  }, [formData.id_categoria, formData.nombre])

  return {
    hasProduct: !!product,
    formData,
    errors,
    isSubmitting,
    canSubmit,
    handleInputChange,
    handleCategoryChange,
    handleStatusChange,
    handleSubmit,
    handleBack,
  }
}

export type UseProductEditHookReturn = ReturnType<typeof useProductEditHook>
