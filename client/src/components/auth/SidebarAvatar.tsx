import type { FC } from 'react'
import type { User } from '../../types/user/user.schema'

interface SidebarAvatarProps {
  user: User
}

const SidebarAvatar: FC<SidebarAvatarProps> = ({ user }) => {
  const initials = user?.nombre
    ? `${user.nombre[0]}${user.apellido?.[0] || ''}`.toUpperCase()
    : '?'

  const getRoleLabel = (rol: string) => {
    const roles: Record<string, string> = {
      administrador: 'Administrador',
      cliente: 'Cliente',
      repartidor: 'Repartidor',
    }
    return roles[rol] || rol
  }

  return (
    <div className="flex items-center p-3 gap-3 rounded-lg bg-gray-50 border border-gray-200">
      <div
        className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
        aria-label="Avatar del usuario"
      >
        <span>{initials}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900 truncate">
          {user?.nombre} {user?.apellido}
        </div>
        <div className="text-xs text-gray-500 truncate">{user?.email}</div>
        <div className="text-xs text-gray-400 mt-1">
          {getRoleLabel(user?.rol || '')}
        </div>
      </div>
    </div>
  )
}

export default SidebarAvatar
