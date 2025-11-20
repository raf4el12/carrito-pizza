import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CategoryIcon from '@mui/icons-material/Category'
import PeopleIcon from '@mui/icons-material/People'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import LogoutIcon from '@mui/icons-material/Logout'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import SettingsIcon from '@mui/icons-material/Settings'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import useAuthContext from '../../context/AuthContext'
import { useLogoutMutation } from '../../hook/auth/useLogout'
import SidebarAvatar from '../auth/SidebarAvatar'
import LoadingPage from '../commons/LoadingPage'
import SnackbarErrorBase from './SnackbarErrorBase'

interface MenuItem {
  label: string
  icon: JSX.Element
  href: string
}

const menu: MenuItem[] = [
  { label: 'Dashboard', icon: <DashboardIcon />, href: '/admin/dashboard' },
  {
    label: 'Pedidos',
    icon: <ShoppingCartIcon />,
    href: '/admin/pedidos',
  },
  {
    label: 'Productos',
    icon: <RestaurantIcon />,
    href: '/admin/productos',
  },
]

const maestros: MenuItem[] = [
  { label: 'Categorías', icon: <CategoryIcon />, href: '/admin/categorias' },
  { label: 'Usuarios', icon: <PeopleIcon />, href: '/admin/usuarios' },
  { label: 'Cupones', icon: <LocalOfferIcon />, href: '/admin/cupones' },
  { label: 'Ingredientes', icon: <RestaurantIcon />, href: '/admin/ingredientes' },
  { label: 'Tamaños', icon: <RestaurantIcon />, href: '/admin/tamanos' },
  { label: 'Tipos de masa', icon: <RestaurantIcon />, href: '/admin/tipos-masa' },
]

export default function SidebarBase() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isLoading } = useAuthContext()
  const logoutMutation = useLogoutMutation()

  const [openSnack, setOpenSnack] = useState(false)

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      navigate('/auth/login')
    } catch {
      setOpenSnack(true)
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnack(false)
  }

  const isActiveRoute = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`)
  }

  if (isLoading) {
    return <LoadingPage />
  }

  if (!user && !isLoading) {
    window.location.href = '/auth/login'
    return <LoadingPage />
  }

  if (user && user.rol !== 'administrador') {
    navigate('/')
    return <LoadingPage />
  }

  const MenuItemLink = ({ item }: { item: MenuItem }) => {
    const isActive = isActiveRoute(item.href)
    return (
      <Link
        to={item.href}
        className={`flex items-center w-full px-3 py-2 rounded-lg text-left transition ${
          isActive
            ? 'bg-gray-900 text-white font-semibold'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="mr-3">{item.icon}</span>
        {item.label}
      </Link>
    )
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 flex flex-col w-64 bg-white border-r border-gray-200 px-4 py-6 overflow-y-auto z-50">
      {/* Logo */}
      <Link
        to="/admin/dashboard"
        className="flex items-center mb-8 rounded-lg p-3 text-white bg-black hover:bg-gray-900 transition"
      >
        <span className="mr-3">
          <RestaurantIcon />
        </span>
        <span className="font-bold text-xl">Pizza Hut Admin</span>
      </Link>

      {/* Navegación Principal */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {menu.map((item) => (
            <li key={item.label}>
              <MenuItemLink item={item} />
            </li>
          ))}
        </ul>

        {/* Sección Maestros */}
        <div className="mt-8 mb-2">
          <div className="text-xs text-gray-400 uppercase font-semibold px-3">
            Maestros
          </div>
        </div>
        <ul className="space-y-1">
          {maestros.map((item) => (
            <li key={item.label}>
              <MenuItemLink item={item} />
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer del Sidebar */}
      <div className="mt-auto space-y-2 pt-4 border-t border-gray-200">
        <Link
          to="/admin/settings"
          className={`flex items-center w-full px-3 py-2 rounded-lg text-left transition ${
            isActiveRoute('/admin/settings')
              ? 'bg-gray-900 text-white font-semibold'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="mr-3">
            <SettingsIcon />
          </span>
          Configuración
        </Link>

        {user && (
          <>
            <button
              type="button"
              className="flex items-center w-full px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <span className="mr-3">
                <LogoutIcon />
              </span>
              {logoutMutation.isPending ? 'Cerrando...' : 'Cerrar Sesión'}
            </button>
            <SidebarAvatar user={user} />
          </>
        )}
      </div>

      <SnackbarErrorBase
        open={openSnack}
        onClose={handleCloseSnackbar}
        title="Ocurrió un error al cerrar sesión"
      />
    </aside>
  )
}
