import { Outlet, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import SidebarBase from './SidebarBase'

const TITLES: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/pedidos': 'Gestión de Pedidos',
  '/admin/productos': 'Gestión de Productos',
  '/admin/categorias': 'Gestión de Categorías',
  '/admin/usuarios': 'Gestión de Usuarios',
  '/admin/cupones': 'Gestión de Cupones',
  '/admin/settings': 'Configuración',
}

const PageTitle = () => {
  const location = useLocation()
  const title = useMemo(() => {
    const found = Object.entries(TITLES).find(([path]) =>
      location.pathname.startsWith(path)
    )
    return found ? found[1] : 'Panel de Administración'
  }, [location.pathname])
  
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500 mt-1">
        Gestiona y administra todos los aspectos de tu pizzería
      </p>
    </div>
  )
}

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <SidebarBase />
      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto ml-64">
        <PageTitle />
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutAdmin
