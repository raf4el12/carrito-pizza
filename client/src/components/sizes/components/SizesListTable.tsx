'use client'

import { useEffect, useMemo, useState } from 'react'
import classnames from 'classnames'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import TablePagination from '@mui/material/TablePagination'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import DebouncedInput from '../../commons/DebouncedInput'
import tableStyles from '../../../styles/table.module.css'
import {
  type ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { Size } from '../../../types/sizes/sizes.schema'
import { formatNumber } from '../../../shared/utils/format'
import IconButton from '@mui/material/IconButton'

interface SizesListTableProps {
  data: Size[]
  globalFilter: string
  onGlobalFilterChange: (value: string | number) => void
  onEdit?: (size: Size) => void
  onDelete?: (size: Size) => void
}

const columnHelper = createColumnHelper<Size>()

const simpleFilter = (row: any, columnId: string, value: string) => {
  const cellValue = row.getValue(columnId)
  return String(cellValue).toLowerCase().includes(value.toLowerCase())
}

const SizesListTable = ({
  data,
  globalFilter,
  onGlobalFilterChange,
  onEdit,
  onDelete,
}: SizesListTableProps) => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setRowSelection({})
  }, [globalFilter])

  const columns = useMemo<ColumnDef<Size, any>[]>(() => {
    return [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      }),
      columnHelper.accessor('id_tamano', {
        header: 'ID',
        cell: ({ row }) => (
          <Typography color="text.primary" fontWeight={600}>
            #{row.original.id_tamano}
          </Typography>
        ),
      }),
      columnHelper.accessor('nombre', {
        header: 'Nombre',
        cell: ({ row }) => (
          <Typography color="text.primary" fontWeight={600}>
            {row.original.nombre}
          </Typography>
        ),
      }),
      columnHelper.accessor('precio_base', {
        header: 'Precio base',
        cell: ({ row }) => (
          <Typography color="text.secondary">
            S/ {formatNumber(row.original.precio_base, 2)}
          </Typography>
        ),
      }),
      columnHelper.accessor('activo', {
        header: 'Estado',
        cell: ({ row }) => (
          <Chip
            label={row.original.activo ? 'Activo' : 'Inactivo'}
            color={row.original.activo ? 'success' : 'default'}
            size="small"
          />
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Acciones',
        enableSorting: false,
        cell: ({ row }) => (
          <Box className="flex items-center gap-1">
            {onEdit && (
              <IconButton size="small" onClick={() => onEdit?.(row.original)} title="Editar">
                <i className="ri-edit-box-line" style={{ fontSize: '20px', color: '#5271FF' }} />
              </IconButton>
            )}
            {onDelete && (
              <IconButton size="small" onClick={() => onDelete?.(row.original)} title="Eliminar">
                <i className="ri-delete-bin-6-line" style={{ fontSize: '20px', color: '#FF3535' }} />
              </IconButton>
            )}
          </Box>
        ),
      }),
    ]
  }, [onDelete, onEdit])

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    enableRowSelection: true,
    globalFilterFn: simpleFilter,
    onRowSelectionChange: setRowSelection,
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
          onChange={onGlobalFilterChange}
          placeholder="Buscar tamaño..."
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
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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

export default SizesListTable


