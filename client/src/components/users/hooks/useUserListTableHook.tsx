'use client'

import {
  type ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Table,
} from '@tanstack/react-table'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import type { ChipProps } from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useCallback, useMemo, useState } from 'react'
import type { User } from '../../../types/user/user.schema'

const columnHelper = createColumnHelper<User>()

type UseUserListTableHookParams = {
  userData?: User[]
  onEdit?: (user: User) => void
  onDelete?: (user: User) => void
  onView?: (user: User) => void
}

const simpleFilter = (row: any, columnId: string, value: string) => {
  const cellValue = row.getValue(columnId)
  return String(cellValue).toLowerCase().includes(value.toLowerCase())
}

const getRoleColor = (rol: User['rol']): ChipProps['color'] => {
  switch (rol) {
    case 'administrador':
      return 'error'
    case 'repartidor':
      return 'warning'
    case 'cliente':
      return 'info'
    default:
      return 'default'
  }
}

export const useUserListTableHook = ({
  userData,
  onEdit,
  onDelete,
  onView,
}: UseUserListTableHookParams) => {
  const data = userData ?? []
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const [globalFilter, setGlobalFilter] = useState('')

  const columns: ColumnDef<User, any>[] = useMemo(() => {
    return [
      {
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
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      columnHelper.accessor('id_usuario', {
        header: 'ID',
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {row.original.id_usuario}
          </Typography>
        ),
      }),
      columnHelper.accessor('nombre', {
        header: 'Nombre',
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {row.original.nombre}
          </Typography>
        ),
      }),
      columnHelper.accessor('apellido', {
        header: 'Apellido',
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {row.original.apellido}
          </Typography>
        ),
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ row }) => (
          <Typography variant="body2" color="text.secondary">
            {row.original.email}
          </Typography>
        ),
      }),
      columnHelper.accessor('username', {
        header: 'Username',
        cell: ({ row }) => (
          <Typography variant="body2" color="text.secondary">
            {row.original.username}
          </Typography>
        ),
      }),
      columnHelper.accessor('rol', {
        header: 'Rol',
        cell: ({ row }) => (
          <Chip
            label={row.original.rol}
            color={getRoleColor(row.original.rol)}
            size="small"
          />
        ),
      }),
      columnHelper.accessor('activo', {
        header: 'Estado',
        cell: ({ row }) => (
          <Chip
            label={row.original.activo ? 'Activo' : 'Inactivo'}
            color={row.original.activo ? 'success' : 'error'}
            size="small"
          />
        ),
      }),
      {
        id: 'actions',
        header: 'Acciones',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            {onView && (
              <IconButton size="medium" onClick={() => onView(row.original)} title="Ver">
                <i className="ri-eye-line" style={{ fontSize: '24px', color: '#5271FF' }} />
              </IconButton>
            )}
            <IconButton size="medium" onClick={() => onEdit?.(row.original)} title="Editar">
              <i className="ri-edit-box-line" style={{ fontSize: '24px', color: '#5271FF' }} />
            </IconButton>
            <IconButton size="medium" onClick={() => onDelete?.(row.original)} title="Eliminar">
              <i className="ri-delete-bin-6-line" style={{ fontSize: '24px', color: '#FF3535' }} />
            </IconButton>
          </div>
        ),
      },
    ]
  }, [onDelete, onEdit, onView])

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      simple: simpleFilter,
    },
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
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  })

  const handleGlobalFilterChange = useCallback((value: string | number) => {
    setGlobalFilter(String(value))
  }, [])

  return {
    table,
    globalFilter,
    handleGlobalFilterChange,
  }
}

export type UseUserListTableHookReturn = {
  table: Table<User>
  globalFilter: string
  handleGlobalFilterChange: (value: string | number) => void
}
