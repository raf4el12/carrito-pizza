'use client'

import { flexRender } from '@tanstack/react-table'
import classnames from 'classnames'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import TablePagination from '@mui/material/TablePagination'
import DebouncedInput from '../../commons/DebouncedInput'
import type { User } from '../../../types/user/user.schema'
import tableStyles from '../../../styles/table.module.css'
import { useUserListTableHook } from '../hooks/useUserListTableHook'

interface UserListTableProps {
  userData?: User[]
  onEdit?: (user: User) => void
  onDelete?: (user: User) => void
  onView?: (user: User) => void
}

const UserListTable = ({ userData, onEdit, onDelete, onView }: UserListTableProps) => {
  const { table, globalFilter, handleGlobalFilterChange } = useUserListTableHook({
    userData,
    onEdit,
    onDelete,
    onView,
  })

  return (
    <Card>
      <Divider />
      <div className="flex justify-between flex-col items-start sm:flex-row sm:items-center gap-y-4 p-5">
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={handleGlobalFilterChange}
          placeholder="Buscar usuario..."
          className="max-sm:is-full"
        />
        <div className="flex items-center max-sm:flex-col gap-4 max-sm:is-full is-auto" />
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
                  No hay datos disponibles
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

export default UserListTable
