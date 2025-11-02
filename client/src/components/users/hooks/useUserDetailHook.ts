'use client'

import { useCallback, useMemo } from 'react'
import type { ChipProps } from '@mui/material/Chip'
import type { User } from '../../../types/user/user.schema'

interface UseUserDetailHookParams {
  user: User | null
  onEdit?: (user: User) => void
}

const getRoleChipColor = (rol: User['rol']): ChipProps['color'] => {
  switch (rol) {
    case 'administrador':
      return 'error'
    case 'repartidor':
      return 'warning'
    case 'cliente':
      return 'info'
    default:
      return 'default'
  }
}

export const useUserDetailHook = ({ user, onEdit }: UseUserDetailHookParams) => {
  const hasUser = !!user

  const initials = useMemo(() => {
    if (!user) return ''
    const firstNameInitial = (user.nombre ?? '').trim().charAt(0)
    const lastNameInitial = (user.apellido ?? '').trim().charAt(0)
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase()
  }, [user])

  const fullName = useMemo(() => {
    if (!user) return ''
    return `${user.nombre ?? ''} ${user.apellido ?? ''}`.trim()
  }, [user])

  const formattedDate = useMemo(() => {
    if (!user?.fecha_registro) return ''
    return new Date(user.fecha_registro).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [user?.fecha_registro])

  const roleColor = useMemo<ChipProps['color']>(() => {
    return user ? getRoleChipColor(user.rol) : 'default'
  }, [user])

  const handleEdit = useCallback(() => {
    if (!user) return
    onEdit?.(user)
  }, [onEdit, user])

  return {
    hasUser,
    initials,
    fullName,
    formattedDate,
    roleColor,
    handleEdit,
  }
}

export type UseUserDetailHookReturn = ReturnType<typeof useUserDetailHook>
