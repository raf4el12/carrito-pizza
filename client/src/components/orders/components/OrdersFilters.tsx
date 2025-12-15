import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { FilterAlt, Clear, Refresh } from '@mui/icons-material'
import { ORDER_STATUSES, PAYMENT_STATUSES } from '../../../types/pedidos/pedidos.schema'

interface OrdersFiltersProps {
  filters: {
    estado_pedido?: string
    estado_pago?: string
  }
  onFilterChange: (filters: { estado_pedido?: string; estado_pago?: string }) => void
  onClearFilters: () => void
  onRefresh?: () => void
}

const OrdersFilters = ({ filters, onFilterChange, onClearFilters, onRefresh }: OrdersFiltersProps) => {
  const hasFilters = filters.estado_pedido || filters.estado_pago

  return (
    <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <FilterAlt color="action" />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Estado Pedido</InputLabel>
            <Select
              value={filters.estado_pedido || ''}
              label="Estado Pedido"
              onChange={(e) => onFilterChange({ ...filters, estado_pedido: e.target.value || undefined })}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {ORDER_STATUSES.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Estado Pago</InputLabel>
            <Select
              value={filters.estado_pago || ''}
              label="Estado Pago"
              onChange={(e) => onFilterChange({ ...filters, estado_pago: e.target.value || undefined })}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {PAYMENT_STATUSES.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {hasFilters && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<Clear />}
              onClick={onClearFilters}
            >
              Limpiar
            </Button>
          )}
        </Stack>
        {onRefresh && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<Refresh />}
            onClick={onRefresh}
          >
            Actualizar
          </Button>
        )}
      </Stack>
    </Box>
  )
}

export default OrdersFilters
