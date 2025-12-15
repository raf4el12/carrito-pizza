'use client'

import { useMemo, useState, useCallback } from 'react'
import {
  flexRender,
  type ColumnDef,
  type FilterFn,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import classnames from 'classnames'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import type { ChipProps } from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import DebouncedInput from '../../commons/DebouncedInput'
import type { PedidoListItem } from '../../../types/pedidos/pedidos.schema'
import { ORDER_STATUSES, PAYMENT_STATUSES } from '../../../types/pedidos/pedidos.schema'
import tableStyles from '../../../styles/table.module.css'

interface OrdersListTableProps {
  ordersData?: PedidoListItem[]
  onView?: (order: PedidoListItem) => void
  onDelete?: (order: PedidoListItem) => void
}

const columnHelper = createColumnHelper<PedidoListItem>()

const fuzzyFilter: FilterFn<any> = (row, columnId, value) => {
  const rowValue = String(row.getValue(columnId) ?? '').toLowerCase()
  const searchValue = String(value ?? '').toLowerCase().trim()
  if (!searchValue) return true
  return rowValue.includes(searchValue)
}

const getOrderStatusColor = (estado: string): ChipProps['color'] => {
  const status = ORDER_STATUSES.find((s) => s.value === estado)
  return (status?.color as ChipProps['color']) || 'default'
}

const getPaymentStatusColor = (estado: string): ChipProps['color'] => {
  const status = PAYMENT_STATUSES.find((s) => s.value === estado)
  return (status?.color as ChipProps['color']) || 'default'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const formatCurrency = (amount: number | string) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return `S/ ${num.toFixed(2)}`
}

const OrdersListTable = ({ ordersData, onView, onDelete }: OrdersListTableProps) => {
  const data = ordersData ?? []
  const [globalFilter, setGlobalFilter] = useState('')

  const handleGlobalFilterChange = useCallback((value: string | number) => {
    setGlobalFilter(String(value))
  }, [])

  const columns: ColumnDef<PedidoListItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('id_pedido', {
        header: '# Pedido',
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-bold">
            #{row.original.id_pedido}
          </Typography>
        ),
      }),
      columnHelper.accessor('fecha_pedido', {
        header: 'Fecha',
        cell: ({ row }) => (
          <Typography variant="body2" color="text.secondary">
            {formatDate(row.original.fecha_pedido)}
          </Typography>
        ),
      }),
      {
        id: 'cliente',
        header: 'Cliente',
        cell: ({ row }) => {
          const cliente = row.original.Cliente
          return (
            <div>
              <Typography variant="body2" className="font-medium">
                {cliente ? `${cliente.nombre} ${cliente.apellido}` : '-'}
              </Typography>
            </div>
          )
        },
      },
      columnHelper.accessor('total_pedido', {
        header: 'Total',
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-bold">
            {formatCurrency(row.original.total_pedido)}
          </Typography>
        ),
      }),
      columnHelper.accessor('estado_pedido', {
        header: 'Estado',
        cell: ({ row }) => (
          <Chip
            label={row.original.estado_pedido.replace('_', ' ')}
            color={getOrderStatusColor(row.original.estado_pedido)}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        ),
      }),
      columnHelper.accessor('estado_pago', {
        header: 'Pago',
        cell: ({ row }) => (
          <Chip
            label={row.original.estado_pago || 'N/A'}
            color={getPaymentStatusColor(row.original.estado_pago || '')}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        ),
      }),
      columnHelper.accessor('metodo_pago', {
        header: 'Método',
        cell: ({ row }) => (
          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
            {row.original.metodo_pago?.replace('_', ' ') || '-'}
          </Typography>
        ),
      }),
      {
        id: 'repartidor',
        header: 'Repartidor',
        cell: ({ row }) => {
          const repartidor = row.original.Repartidor
          return (
            <Typography variant="body2" color={repartidor ? 'text.primary' : 'text.secondary'}>
              {repartidor ? `${repartidor.nombre} ${repartidor.apellido}` : 'Sin asignar'}
            </Typography>
          )
        },
      },
      {
        id: 'actions',
        header: 'Acciones',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            {onView && (
              <IconButton size="medium" onClick={() => onView(row.original)} title="Ver detalle">
                <i className="ri-eye-line" style={{ fontSize: '24px', color: '#5271FF' }} />
              </IconButton>
            )}
            {onDelete && row.original.estado_pedido === 'pendiente' && (
              <IconButton size="medium" onClick={() => onDelete(row.original)} title="Eliminar">
                <i className="ri-delete-bin-6-line" style={{ fontSize: '24px', color: '#FF3535' }} />
              </IconButton>
            )}
          </div>
        ),
      },
    ]
  }, [onView, onDelete])

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
      sorting: [{ id: 'fecha_pedido', desc: true }],
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <Card>
      <Divider />
      <div className="flex justify-between flex-col items-start sm:flex-row sm:items-center gap-y-4 p-5">
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={handleGlobalFilterChange}
          placeholder="Buscar pedido..."
          className="max-sm:is-full"
        />
      </div>
      <div className="overflow-x-auto">
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort(),
                          'bg-transparent border-none p-0': true,
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                        disabled={!header.column.getCanSort()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <i className="ri-arrow-up-s-line text-xl" />,
                          desc: <i className="ri-arrow-down-s-line text-xl" />,
                        }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className="text-center">
                  No hay pedidos disponibles
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map((row) => (
                  <tr
                    key={row.id}
                    className={classnames({
                      selected: row.getIsSelected(),
                    })}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        className="border-bs"
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={(event) => table.setPageSize(Number(event.target.value))}
      />
    </Card>
  )
}

export default OrdersListTable
