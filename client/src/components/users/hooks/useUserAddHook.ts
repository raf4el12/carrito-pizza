'use client'

import { useCallback, useMemo, useState, type ChangeEvent } from 'react'
import type { SelectChangeEvent } from '@mui/material/Select'
import { useUsersCreate } from '../../../hook/users/useUsersCreate'
import type { User } from '../../../types/user/user.schema'

interface UseUserAddHookParams {
  onBack: () => void
  onSuccess?: (user: User) => void
}

interface FormState {
  nombre: string
  apellido: string
  email: string
  username: string
  contraseña: string
  telefono: string
  direccion: string
  rol: 'cliente' | 'administrador' | 'repartidor'
}

const initialFormState: FormState = {
  nombre: '',
  apellido: '',
  email: '',
  username: '',
  contraseña: '',
  telefono: '',
  direccion: '',
  rol: 'cliente',
}

export const useUserAddHook = ({ onBack, onSuccess }: UseUserAddHookParams) => {
  const [formData, setFormData] = useState<FormState>(initialFormState)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const createUser = useUsersCreate()

  const initials = useMemo(() => {
    return `${formData.nombre?.trim().charAt(0) ?? ''}${
      formData.apellido?.trim().charAt(0) ?? ''
    }`.toUpperCase()
  }, [formData.apellido, formData.nombre])

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

  const handleSelectChange = useCallback(
    (field: 'rol') => (event: SelectChangeEvent<FormState['rol']>) => {
      const value = event.target.value as FormState['rol']
      setFormData((prev) => ({ ...prev, [field]: value }))
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
      newErrors.nombre = 'El nombre es requerido'
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido'
    }

    if (!formData.username.trim()) {
      newErrors.username = 'El username es requerido'
    }

    if (!formData.contraseña.trim()) {
      newErrors.contraseña = 'La contraseña es requerida'
    } else if (formData.contraseña.length < 6) {
      newErrors.contraseña = 'La contraseña debe tener al menos 6 caracteres'
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
      const createdUser = await createUser.mutateAsync({
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim(),
        username: formData.username.trim(),
        contraseña: formData.contraseña,
        telefono: formData.telefono.trim() || null,
        direccion: formData.direccion.trim() || null,
        rol: formData.rol,
      })

      resetForm()

      if (createdUser) {
        onSuccess?.(createdUser)
      }

      if (!onSuccess || !createdUser) {
        onBack()
      }
    } catch (error) {
      // El hook de mutación ya maneja toasts
    }
  }, [
    createUser,
    formData.apellido,
    formData.contraseña,
    formData.direccion,
    formData.email,
    formData.nombre,
    formData.rol,
    formData.telefono,
    formData.username,
    onBack,
    onSuccess,
    resetForm,
    validateForm,
  ])

  const isSubmitting = createUser.isPending

  const canSubmit = useMemo(() => {
    return (
      !!formData.nombre.trim() &&
      !!formData.apellido.trim() &&
      !!formData.email.trim() &&
      !!formData.username.trim() &&
      !!formData.contraseña.trim()
    )
  }, [
    formData.apellido,
    formData.contraseña,
    formData.email,
    formData.nombre,
    formData.username,
  ])

  return {
    formData,
    errors,
    initials,
    isSubmitting,
    canSubmit,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleBack,
  }
}

export type UseUserAddHookReturn = ReturnType<typeof useUserAddHook>
