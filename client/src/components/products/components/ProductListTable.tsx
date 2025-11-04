import {
  type ColumnDef,
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
import classnames from 'classnames'
import { useState } from 'react'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import DebouncedInput from '../../commons/DebouncedInput'
import type { Product } from '../../../types/products/products.schema'
import tableStyles from '../../../styles/table.module.css'

// Column helper
const columnHelper = createColumnHelper<Product>()

// Simple filter function
const simpleFilter = (row: any, columnId: string, value: string) => {
  const cellValue = row.getValue(columnId)
  return String(cellValue).toLowerCase().includes(value.toLowerCase())
}

// Helper to get status color
const getStatusColor = (estado: string) => {
  switch (estado) {
    case 'activo':
      return 'success'
    case 'inactivo':
      return 'error'
    default:
      return 'default'
  }
}

interface ProductListTableProps {
  productData?: Product[]
  onEdit?: (product: Product) => void
  onDelete?: (product: Product) => void
  onView?: (product: Product) => void
}

const ProductListTable = ({
  productData,
  onEdit,
  onDelete,
  onView,
}: ProductListTableProps) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const data = productData ?? []

  const columns: ColumnDef<Product, any>[] = [
    {
      id: 'select',
      header: ({ table }: { table: any }) => (
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }: { row: any }) => (
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
    columnHelper.accessor('id_producto', {
      header: 'ID',
      cell: ({ row }: { row: any }) => (
        <Typography color="text.primary" className="font-medium">
          {row.original.id_producto}
        </Typography>
      ),
    }),
    columnHelper.accessor('nombre', {
      header: 'Nombre',
      cell: ({ row }: { row: any }) => (
        <Typography color="text.primary" className="font-medium">
          {row.original.nombre}
        </Typography>
      ),
    }),
    columnHelper.accessor('Categoria', {
      header: 'Categoría',
      cell: ({ row }: { row: any }) => (
        <Typography variant="body2" color="text.secondary">
          {row.original.Categoria?.nombre_categoria || 'Sin categoría'}
        </Typography>
      ),
    }),
    columnHelper.accessor('descripcion', {
      header: 'Descripción',
      cell: ({ row }: { row: any }) => (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            maxWidth: '300px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {row.original.descripcion || 'Sin descripción'}
        </Typography>
      ),
    }),
    columnHelper.accessor('estado', {
      header: 'Estado',
      cell: ({ row }: { row: any }) => (
        <Chip
          label={row.original.estado}
          color={getStatusColor(row.original.estado)}
          size="small"
        />
      ),
    }),
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-1">
          {onView && (
            <IconButton
              size="medium"
              onClick={() => onView?.(row.original)}
              title="Ver"
            >
              <i
                className="ri-eye-line"
                style={{ fontSize: '24px', color: '#5271FF' }}
              />
            </IconButton>
          )}
          <IconButton
            size="medium"
            onClick={() => onEdit?.(row.original)}
            title="Editar"
          >
            <i
              className="ri-edit-box-line"
              style={{ fontSize: '24px', color: '#5271FF' }}
            />
          </IconButton>
          <IconButton
            size="medium"
            onClick={() => onDelete?.(row.original)}
            title="Eliminar"
          >
            <i
              className="ri-delete-bin-6-line"
              style={{ fontSize: '24px', color: '#FF3535' }}
            />
          </IconButton>
        </div>
      ),
      enableSorting: false,
    },
  ]

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

  return (
    <>
      <Card>
        <Divider />
        <div className="flex justify-between flex-col items-start sm:flex-row sm:items-center gap-y-4 p-5">
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value: string | number) =>
              setGlobalFilter(String(value))
            }
            placeholder="Buscar producto..."
            className="max-sm:is-full"
          />
        </div>
        <div className="overflow-x-auto">
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup: any) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header: any) => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <button
                            type="button"
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none':
                                header.column.getCanSort(),
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
                              desc: (
                                <i className="ri-arrow-down-s-line text-xl" />
                              ),
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ??
                              null}
                          </button>
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
                  <td
                    colSpan={table.getVisibleFlatColumns().length}
                    className="text-center"
                  >
                    No hay datos disponibles
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map((row: any) => {
                    return (
                      <tr
                        key={row.id}
                        className={classnames({
                          selected: row.getIsSelected(),
                        })}
                      >
                        {row.getVisibleCells().map((cell: any) => (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
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
          component="div"
          className="border-bs"
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
          onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}
        />
      </Card>
    </>
  )
}

export default ProductListTable
