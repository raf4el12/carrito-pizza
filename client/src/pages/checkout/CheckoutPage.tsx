import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import useAuthContext from '../../context/AuthContext'
import CheckoutFlow from '../../components/checkout/CheckoutFlow'

const CheckoutPage = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="mb-8">
          <Typography variant="h4" className="font-bold text-gray-900 mb-4">
            Inicia sesión para continuar
          </Typography>
          <Typography className="text-gray-600 mb-8 max-w-md mx-auto">
            Para procesar tu pedido necesitamos saber quién eres. Por favor inicia sesión o regístrate.
          </Typography>
          <div className="flex justify-center gap-4">
            <Button
              variant="contained"
              onClick={() => navigate('/auth/login')}
              className="bg-orange-600 hover:bg-orange-700 py-3 px-8 rounded-xl"
            >
              Iniciar Sesión
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/auth/signup')}
              className="border-orange-600 text-orange-600 hover:bg-orange-50 py-3 px-8 rounded-xl"
            >
              Registrarse
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <CheckoutFlow />
    </div>
  )
}

export default CheckoutPage
