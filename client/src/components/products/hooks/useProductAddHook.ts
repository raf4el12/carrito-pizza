'use client'

import { useCallback, useMemo, useState, type ChangeEvent } from 'react'
import type { SelectChangeEvent } from '@mui/material/Select'
import { useProductsCreate } from '../../../hook/products/useProductsCreate'
import type { Product } from '../../../types/products/products.schema'
import { isValidHttpUrl } from '../../../shared/utils/url'

interface UseProductAddHookParams {
  onBack: () => void
  onSuccess?: (product: Product) => void
}

interface FormState {
  nombre: string
  descripcion: string
  id_categoria: number | ''
  imagen_url: string
  precio_base: string
  estado: 'activo' | 'inactivo'
}

const initialFormState: FormState = {
  nombre: '',
  descripcion: '',
  id_categoria: '',
  imagen_url: '',
  precio_base: '',
  estado: 'activo',
}

export const useProductAddHook = ({ onBack, onSuccess }: UseProductAddHookParams) => {
  const [formData, setFormData] = useState<FormState>(initialFormState)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const createProduct = useProductsCreate()

  const handleInputChange = useCallback(
    (field: keyof FormState) =>
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value
        setFormData((prev) => ({ ...prev, [field]: value }))

        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
      },
    [errors]
  )

  const handleCategoryChange = useCallback(
    (event: SelectChangeEvent<number | ''>) => {
      const value = event.target.value
      setFormData((prev) => ({ ...prev, id_categoria: value === '' ? '' : Number(value) }))

      if (errors.id_categoria) {
        setErrors((prev) => ({ ...prev, id_categoria: undefined }))
      }
    },
    [errors.id_categoria]
  )

  const handleStatusChange = useCallback(
    (event: SelectChangeEvent<FormState['estado']>) => {
      const value = event.target.value as FormState['estado']
      setFormData((prev) => ({ ...prev, estado: value }))
    },
    []
  )

  const resetForm = useCallback(() => {
    setFormData(initialFormState)
    setErrors({})
  }, [])

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof FormState, string>> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre del producto es requerido'
    }

    if (formData.id_categoria === '') {
      newErrors.id_categoria = 'La categoría es requerida'
    }

    if (!formData.precio_base.trim()) {
      newErrors.precio_base = 'El precio base es requerido'
    } else {
      const precio = parseFloat(formData.precio_base)
      if (isNaN(precio) || precio <= 0) {
        newErrors.precio_base = 'El precio debe ser un número mayor a 0'
      }
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
    if (!validateForm()) return

    try {
      const createdProduct = await createProduct.mutateAsync({
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim() || null,
        id_categoria: formData.id_categoria as number,
        imagen_url: formData.imagen_url.trim() || null,
        precio_base: parseFloat(formData.precio_base),
        estado: formData.estado,
      })

      resetForm()

      if (createdProduct) {
        onSuccess?.(createdProduct)
      }

      if (!onSuccess || !createdProduct) {
        onBack()
      }
    } catch (error) {
      // El hook de mutación ya maneja toasts
    }
  }, [
    createProduct,
    formData.descripcion,
    formData.estado,
    formData.id_categoria,
    formData.imagen_url,
    formData.nombre,
    onBack,
    onSuccess,
    resetForm,
    validateForm,
  ])

  const isSubmitting = createProduct.isPending

  const canSubmit = useMemo(() => {
    return (
      !!formData.nombre.trim() &&
      formData.id_categoria !== '' &&
      !!formData.precio_base.trim() &&
      !isNaN(parseFloat(formData.precio_base)) &&
      parseFloat(formData.precio_base) > 0
    )
  }, [formData.id_categoria, formData.nombre, formData.precio_base])

  return {
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

export type UseProductAddHookReturn = ReturnType<typeof useProductAddHook>
