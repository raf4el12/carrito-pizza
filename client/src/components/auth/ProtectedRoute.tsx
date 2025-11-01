import { Navigate, Outlet } from 'react-router-dom'
import useAuthContext from '../../context/AuthContext'
import LoadingPage from '../commons/LoadingPage'

interface ProtectedRouteProps {
  allowedRoles?: ('cliente' | 'administrador' | 'repartidor')[]
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuthContext()

  if (isLoading) {
    return <LoadingPage />
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    // Redirigir según el rol del usuario
    if (user.rol === 'administrador') {
      return <Navigate to="/admin/dashboard" replace />
    }
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
