import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'

export function DataTable({ data }) {
  const [selectedRows, setSelectedRows] = useState([])

  if (!data || data.length === 0) {
    return <div className="text-sm text-muted-foreground">No data available</div>
  }

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.length === data.length ? [] : data.map((row) => row.id)
    )
  }



  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
          </TableHead>
          <TableHead>Problem Name</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Checkbox
                checked={selectedRows.includes(row.id)}
                onCheckedChange={() => toggleRow(row.id)}
                aria-label={`Select ${row.name}`}
              />
            </TableCell>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  row.status === 'Attempted'
                    ? 'bg-green-100 text-green-700'
                    : row.status === 'Wrong Answer'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {row.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
