import { Button, Card, CardContent, CardHeader, Divider, IconButton, Stack, Typography } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import useAuthContext from '../../context/AuthContext'

const CartPage = () => {
  const { user } = useAuthContext()
  const { items, total, isLoading, updateQuantity, removeItem } = useCart()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <Typography variant="h5" className="mb-2 font-bold">
          Inicia sesión para ver tu carrito
        </Typography>
        <Button variant="contained" onClick={() => navigate('/auth/login')}>
          Ir a login
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <Typography variant="h4" className="font-bold mb-6 text-gray-900">
        Tu Carrito
      </Typography>

      {isLoading ? (
        <Typography>Cargando carrito...</Typography>
      ) : items.length === 0 ? (
        <Card>
          <CardContent>
            <Typography className="mb-2">No tienes productos en el carrito.</Typography>
            <Button variant="outlined" onClick={() => navigate('/menu')}>
              Ver menú
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const name = item.Variante?.Producto?.nombre || 'Producto'
              const image = item.Variante?.Producto?.imagen_url || 'https://placehold.co/120x120?text=Pizza'
              const tamano = item.Variante?.Tamano?.nombre
              const masa = item.Variante?.Tipo_Masa?.nombre
              const subtotal = item.totals?.subtotal || 0

              return (
                <Card key={item.id_carrito} className="shadow-sm">
                  <CardContent>
                    <div className="flex gap-4 items-center">
                      <img src={image} alt={name} className="w-24 h-24 object-cover rounded" />
                      <div className="flex-1">
                        <Typography variant="h6" className="font-semibold text-gray-900">
                          {name}
                        </Typography>
                        <Typography variant="body2" className="text-gray-500">
                          {tamano && `Tamaño: ${tamano}`}{tamano && masa ? ' · ' : ''}{masa && `Masa: ${masa}`}
                        </Typography>
                        <Typography variant="body2" className="text-gray-700 mt-1">
                          Subtotal: S/ {subtotal.toFixed(2)}
                        </Typography>
                      </div>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id_carrito, Math.max(1, item.cantidad - 1))}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography>{item.cantidad}</Typography>
                        <IconButton size="small" onClick={() => updateQuantity(item.id_carrito, item.cantidad + 1)}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                      <IconButton color="error" onClick={() => removeItem(item.id_carrito)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="shadow-sm">
            <CardHeader title="Resumen" />
            <Divider />
            <CardContent>
              <div className="flex justify-between mb-4">
                <Typography variant="subtitle1">Total</Typography>
                <Typography variant="h6" className="font-bold">S/ {Number(total || 0).toFixed(2)}</Typography>
              </div>
              <Button fullWidth variant="contained" onClick={() => navigate('/checkout')}>
                Continuar al checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default CartPage
