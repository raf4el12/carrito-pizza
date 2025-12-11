import { useState } from 'react'
import { Button, Card, CardContent, CardHeader, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../../context/CartContext'
import useAuthContext from '../../context/AuthContext'
import pedidosService from '../../shared/services/pedidos.service'

const CheckoutPage = () => {
  const { user } = useAuthContext()
  const { total, refresh } = useCart()
  const navigate = useNavigate()

  const [direccion, setDireccion] = useState('')
  const [notas, setNotas] = useState('')
  const [metodoPago, setMetodoPago] = useState('efectivo')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <Typography variant="h5" className="mb-2 font-bold">
          Inicia sesión para continuar con el checkout
        </Typography>
        <Button variant="contained" onClick={() => navigate('/auth/login')}>
          Ir a login
        </Button>
      </div>
    )
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!direccion.trim()) {
      toast.error('Ingresa una dirección de entrega')
      return
    }
    setIsSubmitting(true)
    try {
      await pedidosService.create({
        id_cliente: user.id_usuario,
        direccion_entrega: direccion,
        metodo_pago: metodoPago,
        notas_cliente: notas || null,
      })
      toast.success('Pedido creado correctamente')
      await refresh()
      navigate('/menu')
    } catch (error) {
      console.error('Error al crear pedido', error)
      toast.error('No se pudo crear el pedido')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Typography variant="h4" className="font-bold mb-6 text-gray-900">
        Checkout
      </Typography>

      <Card className="shadow-sm">
        <CardHeader title="Detalles de entrega" />
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Dirección de entrega"
              fullWidth
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
            <TextField
              label="Notas (opcional)"
              fullWidth
              multiline
              minRows={3}
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
            <TextField
              select
              label="Método de pago"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              fullWidth
            >
              <MenuItem value="efectivo">Efectivo</MenuItem>
              <MenuItem value="tarjeta">Tarjeta</MenuItem>
            </TextField>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" className="font-semibold">
                Total: S/ {Number(total || 0).toFixed(2)}
              </Typography>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? 'Procesando...' : 'Confirmar pedido'}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CheckoutPage
