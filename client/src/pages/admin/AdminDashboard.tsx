import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  FiShoppingBag,
  FiDollarSign,
  FiPackage,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiUsers,
  FiGrid,
  FiList,
  FiSettings,
  FiArrowRight,
} from 'react-icons/fi'
import { usePedidos } from '../../hook/pedidos/usePedidos'
import { useProducts } from '../../hook/products/useProducts'
import type { PedidoListItem } from '../../types/pedidos/pedidos.schema'

// Colores para estados de pedidos
const estadoColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  pendiente: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: <FiClock /> },
  confirmado: { bg: 'bg-blue-100', text: 'text-blue-700', icon: <FiCheckCircle /> },
  en_preparacion: { bg: 'bg-orange-100', text: 'text-orange-700', icon: <FiPackage /> },
  en_camino: { bg: 'bg-purple-100', text: 'text-purple-700', icon: <FiTruck /> },
  entregado: { bg: 'bg-green-100', text: 'text-green-700', icon: <FiCheckCircle /> },
  cancelado: { bg: 'bg-red-100', text: 'text-red-700', icon: <FiXCircle /> },
}

const formatCurrency = (amount: number | string) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return `S/ ${num.toFixed(2)}`
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const AdminDashboard = () => {
  const { data: pedidos = [], isLoading: loadingPedidos } = usePedidos()
  const { data: productos = [], isLoading: loadingProductos } = useProducts()

  // Calcular estadísticas
  const stats = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const pedidosPendientes = pedidos.filter((p) => p.estado_pedido === 'pendiente').length
    const pedidosEnPreparacion = pedidos.filter((p) => p.estado_pedido === 'en_preparacion').length
    const pedidosEnCamino = pedidos.filter((p) => p.estado_pedido === 'en_camino').length
    
    // Ingresos del mes (solo pedidos entregados)
    const ingresosMes = pedidos
      .filter((p) => {
        const fecha = new Date(p.fecha_pedido)
        return (
          p.estado_pedido === 'entregado' &&
          fecha.getMonth() === currentMonth &&
          fecha.getFullYear() === currentYear
        )
      })
      .reduce((sum, p) => sum + parseFloat(String(p.total_pedido)), 0)

    // Ingresos del día
    const today = now.toDateString()
    const ingresosHoy = pedidos
      .filter((p) => {
        const fecha = new Date(p.fecha_pedido)
        return p.estado_pedido === 'entregado' && fecha.toDateString() === today
      })
      .reduce((sum, p) => sum + parseFloat(String(p.total_pedido)), 0)

    const productosActivos = productos.filter((p) => p.disponible).length
    const pedidosHoy = pedidos.filter((p) => new Date(p.fecha_pedido).toDateString() === today).length

    return {
      pedidosPendientes,
      pedidosEnPreparacion,
      pedidosEnCamino,
      ingresosMes,
      ingresosHoy,
      productosActivos,
      totalProductos: productos.length,
      pedidosHoy,
      totalPedidos: pedidos.length,
    }
  }, [pedidos, productos])

  // Pedidos recientes (últimos 5)
  const pedidosRecientes = useMemo(() => {
    return [...pedidos]
      .sort((a, b) => new Date(b.fecha_pedido).getTime() - new Date(a.fecha_pedido).getTime())
      .slice(0, 5)
  }, [pedidos])

  const isLoading = loadingPedidos || loadingProductos

  // Links rápidos
  const quickLinks = [
    { to: '/admin/pedidos', label: 'Gestión de Pedidos', icon: <FiShoppingBag />, color: 'bg-orange-500' },
    { to: '/admin/productos', label: 'Productos', icon: <FiPackage />, color: 'bg-blue-500' },
    { to: '/admin/categorias', label: 'Categorías', icon: <FiGrid />, color: 'bg-green-500' },
    { to: '/admin/usuarios', label: 'Usuarios', icon: <FiUsers />, color: 'bg-purple-500' },
    { to: '/admin/ingredientes', label: 'Ingredientes', icon: <FiList />, color: 'bg-pink-500' },
    { to: '/admin/resenas', label: 'Reseñas', icon: <FiSettings />, color: 'bg-gray-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pedidos Pendientes */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Pedidos Pendientes</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">
                {isLoading ? '...' : stats.pedidosPendientes}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <FiClock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            {stats.pedidosEnPreparacion} en preparación • {stats.pedidosEnCamino} en camino
          </div>
        </div>

        {/* Ingresos del Mes */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Ingresos del Mes</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {isLoading ? '...' : formatCurrency(stats.ingresosMes)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FiDollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            Hoy: {formatCurrency(stats.ingresosHoy)}
          </div>
        </div>

        {/* Productos Activos */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Productos Activos</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {isLoading ? '...' : stats.productosActivos}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FiPackage className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            De {stats.totalProductos} productos totales
          </div>
        </div>

        {/* Pedidos Hoy */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Pedidos Hoy</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {isLoading ? '...' : stats.pedidosHoy}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FiShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            Total histórico: {stats.totalPedidos}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pedidos Recientes */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Pedidos Recientes</h2>
            <Link
              to="/admin/pedidos"
              className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1"
            >
              Ver todos <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="p-8 text-center text-gray-400">Cargando...</div>
          ) : pedidosRecientes.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No hay pedidos aún</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {pedidosRecientes.map((pedido) => {
                const estado = estadoColors[pedido.estado_pedido] || estadoColors.pendiente
                return (
                  <div
                    key={pedido.id_pedido}
                    className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${estado.bg} rounded-full flex items-center justify-center ${estado.text}`}>
                        {estado.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Pedido #{pedido.id_pedido}
                        </p>
                        <p className="text-sm text-gray-500">
                          {pedido.Cliente ? `${pedido.Cliente.nombre} ${pedido.Cliente.apellido}` : 'Cliente'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(pedido.total_pedido)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(pedido.fecha_pedido)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Accesos Rápidos</h2>
          </div>
          <div className="p-4 space-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className={`w-10 h-10 ${link.color} rounded-lg flex items-center justify-center text-white`}>
                  {link.icon}
                </div>
                <span className="font-medium text-gray-700 group-hover:text-gray-900">
                  {link.label}
                </span>
                <FiArrowRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Resumen de Estados */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
        <h2 className="font-semibold text-gray-900 mb-4">Estado de Pedidos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {Object.entries(estadoColors).map(([estado, config]) => {
            const count = pedidos.filter((p) => p.estado_pedido === estado).length
            return (
              <div
                key={estado}
                className={`${config.bg} ${config.text} rounded-lg p-4 text-center`}
              >
                <div className="flex justify-center mb-2">{config.icon}</div>
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-xs capitalize mt-1">{estado.replace('_', ' ')}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
