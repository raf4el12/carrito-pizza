import type { FC } from 'react'
import type { User } from '../../types/user/user.schema'

interface SidebarAvatarProps {
  user: User
}

const SidebarAvatar: FC<SidebarAvatarProps> = ({ user }) => {
  const initials = user?.nombre
    ? `${user.nombre[0]}${user.apellido?.[0] || ''}`.toUpperCase()
    : '?'

  return (
    <div className="flex items-center mt-4 p-2 gap-2 rounded-lg bg-gray-100">
      <div
        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700 focus:outline-none"
        aria-label="Abrir menú de usuario"
      >
        <span>{initials}</span>
      </div>
      <div>
        <div className="text-sm font-semibold">{user?.nombre} {user?.apellido}</div>
        <div className="text-xs text-gray-500">{user?.email}</div>
      </div>
    </div>
  )
}

export default SidebarAvatar
