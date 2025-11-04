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
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import DebouncedInput from '../../commons/DebouncedInput'
import type { Category } from '../../../types/categories/categories.schema'
import tableStyles from '../../../styles/table.module.css'

// Column helper
const columnHelper = createColumnHelper<Category>()

// Simple filter function
const simpleFilter = (row: any, columnId: string, value: string) => {
  const cellValue = row.getValue(columnId)
  return String(cellValue).toLowerCase().includes(value.toLowerCase())
}

interface CategoryListTableProps {
  categoryData?: Category[]
  onEdit?: (category: Category) => void
  onDelete?: (category: Category) => void
  onAdd?: () => void
}

const CategoryListTable = ({
  categoryData,
  onEdit,
  onDelete,
}: CategoryListTableProps) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const data = categoryData ?? []

  const columns: ColumnDef<Category, any>[] = [
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
    columnHelper.accessor('id_categoria', {
      header: 'ID',
      cell: ({ row }: { row: any }) => (
        <Typography color="text.primary" className="font-medium">
          {row.original.id_categoria}
        </Typography>
      ),
    }),
    columnHelper.accessor('nombre_categoria', {
      header: 'Nombre',
      cell: ({ row }: { row: any }) => (
        <Typography color="text.primary" className="font-medium">
          {row.original.nombre_categoria}
        </Typography>
      ),
    }),
    columnHelper.accessor('descripcion', {
      header: 'Descripción',
      cell: ({ row }: { row: any }) => (
        <Typography variant="body2" color="text.secondary">
          {row.original.descripcion || 'Sin descripción'}
        </Typography>
      ),
    }),
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-1">
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
            placeholder="Buscar categoría..."
            className="max-sm:is-full"
          />
          <div className="flex items-center max-sm:flex-col gap-4 max-sm:is-full is-auto">
            {/* <Button
              variant="contained"
              onClick={onAdd}
              startIcon={<i className="ri-add-line" />}
              className="max-sm:is-full is-auto"
              disabled={!onAdd}
            >
              Agregar Categoría
            </Button> */}
          </div>
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

export default CategoryListTable
