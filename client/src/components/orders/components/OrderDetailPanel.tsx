import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material'
import { ArrowBack, LocalShipping, Payment, Person, LocationOn } from '@mui/icons-material'
import type { ChipProps } from '@mui/material/Chip'
import { usePedidoById } from '../../../hook/pedidos/usePedidoById'
import { useUsers } from '../../../hook/users/useUsers'
import { ORDER_STATUSES, PAYMENT_STATUSES } from '../../../types/pedidos/pedidos.schema'
import type { PedidoListItem } from '../../../types/pedidos/pedidos.schema'
import LoadingPage from '../../commons/LoadingPage'

interface OrderDetailPanelProps {
  order: PedidoListItem | null
  onBack: () => void
  onUpdateEstado: (id_pedido: number, estado: string) => Promise<void>
  onUpdateRepartidor: (id_pedido: number, id_repartidor: number | null) => Promise<void>
  isUpdating?: boolean
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const formatCurrency = (amount: number | string) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return `S/ ${num.toFixed(2)}`
}

const getOrderStatusColor = (estado: string): ChipProps['color'] => {
  const status = ORDER_STATUSES.find((s) => s.value === estado)
  return (status?.color as ChipProps['color']) || 'default'
}

const getPaymentStatusColor = (estado: string): ChipProps['color'] => {
  const status = PAYMENT_STATUSES.find((s) => s.value === estado)
  return (status?.color as ChipProps['color']) || 'default'
}

const OrderDetailPanel = ({
  order,
  onBack,
  onUpdateEstado,
  onUpdateRepartidor,
  isUpdating,
}: OrderDetailPanelProps) => {
  const { data: orderDetail, isLoading } = usePedidoById(order?.id_pedido || null)
  const { data: users } = useUsers()

  const [selectedEstado, setSelectedEstado] = useState<string>('')
  const [selectedRepartidor, setSelectedRepartidor] = useState<string>('')

  // Filtrar solo repartidores
  const repartidores = users?.filter((u) => u.rol === 'repartidor' && u.activo) || []

  if (!order) return null

  if (isLoading) {
    return <LoadingPage />
  }

  const pedido = orderDetail || order

  const handleEstadoChange = async () => {
    if (selectedEstado && selectedEstado !== pedido.estado_pedido) {
      await onUpdateEstado(pedido.id_pedido, selectedEstado)
      setSelectedEstado('')
    }
  }

  const handleRepartidorChange = async () => {
    const repartidorId = selectedRepartidor ? parseInt(selectedRepartidor) : null
    await onUpdateRepartidor(pedido.id_pedido, repartidorId)
    setSelectedRepartidor('')
  }

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Button variant="outlined" startIcon={<ArrowBack />} onClick={onBack}>
          Volver
        </Button>
        <Typography variant="h5" fontWeight="bold">
          Pedido #{pedido.id_pedido}
        </Typography>
        <Chip
          label={pedido.estado_pedido.replace('_', ' ')}
          color={getOrderStatusColor(pedido.estado_pedido)}
          sx={{ textTransform: 'capitalize' }}
        />
      </Stack>

      <Grid container spacing={3}>
        {/* Información del Pedido */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person /> Información del Cliente
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Nombre
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {pedido.Cliente ? `${pedido.Cliente.nombre} ${pedido.Cliente.apellido}` : '-'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {pedido.Cliente?.email || '-'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Teléfono
                  </Typography>
                  <Typography variant="body1">
                    {pedido.Cliente?.telefono || '-'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Fecha del Pedido
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(pedido.fecha_pedido)}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 4 }}>
                <LocationOn /> Dirección de Entrega
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">{pedido.direccion_entrega}</Typography>
              {orderDetail?.notas_cliente && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Notas del cliente:
                  </Typography>
                  <Typography variant="body1">{orderDetail.notas_cliente}</Typography>
                </Box>
              )}

              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 4 }}>
                <Payment /> Información de Pago
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Método de Pago
                  </Typography>
                  <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {pedido.metodo_pago?.replace('_', ' ') || '-'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Estado del Pago
                  </Typography>
                  <Chip
                    label={pedido.estado_pago || 'N/A'}
                    color={getPaymentStatusColor(pedido.estado_pago || '')}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {formatCurrency(pedido.total_pedido)}
                  </Typography>
                </Grid>
              </Grid>

              {/* Detalles de los productos */}
              {orderDetail?.Detalles && orderDetail.Detalles.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                    Productos del Pedido
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  {orderDetail.Detalles.map((detalle: any, index: number) => (
                    <Box key={index} sx={{ py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="start">
                        <Box>
                          <Typography fontWeight="medium">
                            {detalle.Variante?.Producto?.nombre || 'Producto'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {detalle.Variante?.Tamano?.nombre}
                            {detalle.Variante?.Tipo_Masa && ` - ${detalle.Variante.Tipo_Masa.nombre}`}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Cantidad: {detalle.cantidad}
                          </Typography>
                        </Box>
                        <Typography fontWeight="bold">
                          {formatCurrency(detalle.subtotal)}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Panel de Acciones */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Cambiar Estado */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Actualizar Estado
                </Typography>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Nuevo Estado</InputLabel>
                  <Select
                    value={selectedEstado || pedido.estado_pedido}
                    label="Nuevo Estado"
                    onChange={(e) => setSelectedEstado(e.target.value)}
                    disabled={isUpdating || pedido.estado_pedido === 'entregado' || pedido.estado_pedido === 'cancelado'}
                  >
                    {ORDER_STATUSES.map((status) => (
                      <MenuItem key={status.value} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleEstadoChange}
                  disabled={isUpdating || !selectedEstado || selectedEstado === pedido.estado_pedido}
                >
                  {isUpdating ? <CircularProgress size={24} /> : 'Actualizar Estado'}
                </Button>
              </CardContent>
            </Card>

            {/* Asignar Repartidor */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShipping /> Asignar Repartidor
                </Typography>
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Repartidor Actual
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {pedido.Repartidor
                      ? `${pedido.Repartidor.nombre} ${pedido.Repartidor.apellido}`
                      : 'Sin asignar'}
                  </Typography>
                </Box>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Seleccionar Repartidor</InputLabel>
                  <Select
                    value={selectedRepartidor}
                    label="Seleccionar Repartidor"
                    onChange={(e) => setSelectedRepartidor(e.target.value)}
                    disabled={isUpdating}
                  >
                    <MenuItem value="">
                      <em>Sin asignar</em>
                    </MenuItem>
                    {repartidores.map((repartidor) => (
                      <MenuItem key={repartidor.id_usuario} value={repartidor.id_usuario.toString()}>
                        {repartidor.nombre} {repartidor.apellido}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleRepartidorChange}
                  disabled={isUpdating}
                >
                  {isUpdating ? <CircularProgress size={24} /> : 'Asignar Repartidor'}
                </Button>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderDetailPanel
