'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from 'react'
import type { SelectChangeEvent } from '@mui/material/Select'
import { useUsersUpdate } from '../../../hook/users/useUsersUpdate'
import type { User } from '../../../types/user/user.schema'

interface UseUserEditHookParams {
  user: User | null
  onBack: () => void
  onSuccess?: (user: User) => void
}

interface EditFormState {
  nombre: string
  apellido: string
  email: string
  username: string
  telefono: string
  direccion: string
  rol: 'cliente' | 'administrador' | 'repartidor'
  activo: boolean
}

const emptyFormState: EditFormState = {
  nombre: '',
  apellido: '',
  email: '',
  username: '',
  telefono: '',
  direccion: '',
  rol: 'cliente',
  activo: true,
}

type FormErrors = Partial<Record<'nombre' | 'apellido' | 'email' | 'username', string>>

export const useUserEditHook = ({ user, onBack, onSuccess }: UseUserEditHookParams) => {
  const [formData, setFormData] = useState<EditFormState>(emptyFormState)
  const [errors, setErrors] = useState<FormErrors>({})
  const updateUser = useUsersUpdate()

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre ?? '',
        apellido: user.apellido ?? '',
        email: user.email ?? '',
        username: user.username ?? '',
        telefono: user.telefono ?? '',
        direccion: user.direccion ?? '',
        rol: user.rol ?? 'cliente',
        activo: user.activo ?? true,
      })
      setErrors({})
    } else {
      setFormData(emptyFormState)
      setErrors({})
    }
  }, [user])

  const initials = useMemo(() => {
    return `${
      formData.nombre.trim().charAt(0) ?? ''
    }${formData.apellido.trim().charAt(0) ?? ''}`.toUpperCase()
  }, [formData.apellido, formData.nombre])

  const resetForm = useCallback(() => {
    setFormData(emptyFormState)
    setErrors({})
  }, [])

  const handleInputChange = useCallback(
    (field: keyof EditFormState) =>
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value
        setFormData((prev) => ({ ...prev, [field]: value }))

        if (field === 'nombre' || field === 'apellido' || field === 'email' || field === 'username') {
          setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
      },
    []
  )

  const handleRoleChange = useCallback(
    (event: SelectChangeEvent<EditFormState['rol']>) => {
      const value = event.target.value as EditFormState['rol']
      setFormData((prev) => ({ ...prev, rol: value }))
    },
    []
  )

  const handleStatusChange = useCallback(
    (event: SelectChangeEvent<'activo' | 'inactivo'>) => {
      const value = event.target.value
      setFormData((prev) => ({ ...prev, activo: value === 'activo' }))
    },
    []
  )

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {}

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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleBack = useCallback(() => {
    resetForm()
    onBack()
  }, [onBack, resetForm])

  const handleSubmit = useCallback(async () => {
    if (!user) return
    if (!validateForm()) return

    try {
      const updatedUser = await updateUser.mutateAsync({
        id: user.id_usuario,
        data: {
          nombre: formData.nombre.trim(),
          apellido: formData.apellido.trim(),
          email: formData.email.trim(),
          username: formData.username.trim(),
          telefono: formData.telefono.trim() || null,
          direccion: formData.direccion.trim() || null,
          rol: formData.rol,
          activo: formData.activo,
        },
      })

      resetForm()

      if (updatedUser) {
        onSuccess?.(updatedUser)
      }

      if (!onSuccess || !updatedUser) {
        onBack()
      }
    } catch (error) {
      // El hook de mutación gestiona el toast de error
    }
  }, [
    formData.apellido,
    formData.direccion,
    formData.email,
    formData.nombre,
    formData.rol,
    formData.telefono,
    formData.username,
    formData.activo,
    onBack,
    onSuccess,
    resetForm,
    updateUser,
    user,
    validateForm,
  ])

  const isSubmitting = updateUser.isPending

  const canSubmit = useMemo(() => {
    return (
      !!formData.nombre.trim() &&
      !!formData.apellido.trim() &&
      !!formData.email.trim() &&
      !!formData.username.trim()
    )
  }, [formData.apellido, formData.email, formData.nombre, formData.username])

  return {
    hasUser: !!user,
    formData,
    errors,
    initials,
    isSubmitting,
    canSubmit,
    handleInputChange,
    handleRoleChange,
    handleStatusChange,
    handleSubmit,
    handleBack,
  }
}

export type UseUserEditHookReturn = ReturnType<typeof useUserEditHook>
