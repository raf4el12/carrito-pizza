'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'

import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Chip,
  FormControl,
  MenuItem,
  Rating,
  Select,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material'
import IosShareIcon from '@mui/icons-material/IosShare'
import type { TextFieldProps } from '@mui/material/TextField'
import type { SelectChangeEvent } from '@mui/material/Select'
import classnames from 'classnames'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import OptionMenu from '../commons/OptionMenu'
import type { Review, ReviewStatus } from '../../types/reviews/reviews.schema'
import tableStyles from '../../styles/table.module.css'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
}

type ReviewWithActionsType = Review

const STATUS_OPTIONS: Array<ReviewStatus | 'todas'> = [
  'todas',
  'pendiente',
  'aprobado',
  'rechazado',
  'oculto',
]

const statusColor: Record<ReviewStatus, 'default' | 'success' | 'warning' | 'error'> = {
  pendiente: 'warning',
  aprobado: 'success',
  rechazado: 'error',
  oculto: 'default',
}

const getInitials = (name?: string | null, lastName?: string | null) => {
  const first = name?.charAt(0) ?? ''
  const last = lastName?.charAt(0) ?? ''
  return `${first}${last}`.toUpperCase() || 'R'
}

const formatDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Fecha no disponible'
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value) => {
  const rowValue = String(row.getValue(columnId) ?? '').toLowerCase()
  const searchValue = String(value ?? '').toLowerCase().trim()
  if (!searchValue) return true
  return rowValue.includes(searchValue)
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} size='small' />
}

// Column Definitions
const columnHelper = createColumnHelper<ReviewWithActionsType>()

interface ManageReviewsTableProps {
  reviewsData?: Review[]
  onDelete?: (id: number) => void
}

const ManageReviewsTable = ({ reviewsData = [], onDelete }: ManageReviewsTableProps) => {
  const [status, setStatus] = useState<ReviewStatus | 'todas'>('todas')
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState<ReviewWithActionsType[]>(reviewsData)
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    if (status === 'todas') {
      setData(reviewsData)
    } else {
      setData(reviewsData.filter((review) => review.estado === status))
    }
  }, [reviewsData, status])

  const handleDeleteRow = useCallback(
    (id: number) => {
      if (onDelete) {
        onDelete(id)
      }
    },
    [onDelete]
  )

  const columns = useMemo<ColumnDef<ReviewWithActionsType, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      columnHelper.display({
        id: 'product',
        header: 'Producto',
        cell: ({ row }) => {
          const product = row.original.Producto
          return (
            <div className="flex items-center gap-4">
              <img
                src={product?.imagen_url || 'https://placehold.co/80x80?text=Producto'}
                width={38}
                height={38}
                className="rounded bg-actionHover object-cover"
                alt={product?.nombre || 'Producto sin nombre'}
              />
              <div className="flex flex-col items-start gap-0.5">
                <Typography className="font-medium" color="text.primary">
                  {product?.nombre || 'Producto no disponible'}
                </Typography>
                <Typography variant="body2" className="text-wrap" color="text.secondary">
                  {product ? `ID #${product.id_producto}` : 'Sin información'}
                </Typography>
              </div>
            </div>
          )
        },
      }),
      columnHelper.display({
        id: 'reviewer',
        header: 'Cliente',
        cell: ({ row }) => {
          const client = row.original.Cliente
          const fullName = client
            ? `${client.nombre} ${client.apellido}`.trim()
            : 'Cliente no disponible'
          return (
            <div className="flex items-center gap-4">
              <Avatar sx={{ width: 34, height: 34 }}>
                {getInitials(client?.nombre, client?.apellido)}
              </Avatar>
              <div className="flex flex-col items-start gap-0.5">
                <Typography className="font-medium" color="text.primary">
                  {fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {client?.email || 'Sin correo'}
                </Typography>
              </div>
            </div>
          )
        },
      }),
      columnHelper.accessor('rating', {
        header: 'Reseña',
        sortingFn: (rowA, rowB) => rowA.original.rating - rowB.original.rating,
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <Rating
              name={`product-review-${row.original.id_resena}`}
              readOnly
              value={row.original.rating}
              emptyIcon={<i className="ri-star-fill" />}
            />
            {row.original.titulo && (
              <Typography className="font-medium" color="text.primary">
                {row.original.titulo}
              </Typography>
            )}
            <Typography variant="body2" className="text-wrap" color="text.secondary">
              {row.original.comentario}
            </Typography>
          </div>
        ),
      }),
      columnHelper.accessor('created_at', {
        header: 'Fecha',
        sortingFn: (rowA, rowB) => {
          const dateA = new Date(rowA.original.created_at)
          const dateB = new Date(rowB.original.created_at)
          return dateA.getTime() - dateB.getTime()
        },
        cell: ({ row }) => <Typography>{formatDate(row.original.created_at)}</Typography>,
      }),
      columnHelper.accessor('estado', {
        header: 'Estado',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Chip
              label={row.original.estado}
              color={statusColor[row.original.estado]}
              variant="outlined"
              size="small"
            />
          </div>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => (
          <OptionMenu
            iconButtonProps={{ size: 'medium' }}
            options={[
              {
                text: 'Eliminar',
                icon: 'ri-delete-bin-line',
                onClick: () => handleDeleteRow(row.original.id_resena),
              },
            ]}
          />
        ),
        enableSorting: false,
      }),
    ],
    [handleDeleteRow]
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as ReviewStatus | 'todas')
  }

  return (
    <>
      <Card>
        <div className='flex justify-between flex-col items-start flex-wrap sm:flex-row sm:items-center gap-4 p-5'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Buscar reseñas'
            className='max-sm:is-full'
          />
          <div className='flex flex-col sm:flex-row items-center gap-4 max-sm:is-full'>
            <FormControl fullWidth size='small' className='sm:is-[140px] flex-auto is-full'>
              <Select
                fullWidth
                id='select-status'
                value={status}
                onChange={handleStatusChange}
                labelId='status-select'
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option === 'todas' ? 'Todas' : option.charAt(0).toUpperCase() + option.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant='contained'
              startIcon={<IosShareIcon fontSize='small' />}
              sx={{
                width: { xs: '100%', sm: 'auto' },
                height: 40,
                borderRadius: '20px',
                textTransform: 'none',
                backgroundColor: '#8B4513',
                color: '#fff',
                fontWeight: 600,
                px: 3.5,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#6B3410',
                  boxShadow: 'none',
                },
              }}
            >
              Exportar
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='ri-arrow-up-s-line text-xl' />,
                              desc: <i className='ri-arrow-down-s-line text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No hay datos disponibles
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component='div'
          className='border-bs'
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
          onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        />
      </Card>
    </>
  )
}

export default ManageReviewsTable
