import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { DataTable } from '@/components/table/dataTable';
import {
  CandidateFlat,
  CandidateNested,
  flattenCandidates,
} from '@/components/table/utils/flatenData';
import { JSX } from 'react';

type Props = {
  dataBe: CandidateNested[];
};

export function CandidateTable({ dataBe }: Props) {
  const data: CandidateFlat[] = flattenCandidates(dataBe);

  const sortableColumns = ['full_name', 'email'];

  const customCells: Record<string, (row: any) => JSX.Element> = {
    linkedin_link: (row) => (
      <a
        href={row.getValue('linkedin_link')}
        target='_blank'
        rel='noopener noreferrer'
        className='text-[#01959F] underline'
      >
        {row.getValue('linkedin_link')}
      </a>
    ),
  };

  const attributeColumns: ColumnDef<CandidateFlat>[] = dataBe[0].attributes
    .sort((a, b) => a.order - b.order)
    .map((attr) => ({
      accessorKey: attr.key,
      header: ({ column }: any) =>
        sortableColumns.includes(attr.key) ? (
          <div
            className=' gap-2 items-center flex cursor-pointer'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {attr.label} <ArrowUpDown size={15} />
          </div>
        ) : (
          <div>{attr.label}</div>
        ),
      cell: ({ row }: any) =>
        customCells[attr.key]?.(row) || (
          <div className='lowercase'>{row.getValue(attr.key)}</div>
        ),
      enableSorting: sortableColumns.includes(attr.key),
    }));

  const columns: ColumnDef<CandidateFlat>[] = [
    {
      id: 'select',
      header: ({ table }: any) => (
        <div className='min-w-[25px] '>
          <Checkbox
            className='border-[#01959F] mt-1  w-5 h-5 data-[state=checked]:border-[#01959F] data-[state=checked]:bg-[#01959F]'
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
        </div>
      ),
      cell: ({ row }: any) => (
        <div className='sticky left-0 bg-white z-10'>
          <Checkbox
            className='border-[#01959F] w-5 h-5 data-[state=checked]:border-[#01959F] data-[state=checked]:bg-[#01959F]'
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },

    ...attributeColumns,
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }: any) => (
        <div className='sticky right-0 bg-white z-20'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='h-8 w-8 p-0'
              >
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(row.original.id)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      filterColumn='email'
      stickyColumn={true}
    />
  );
}
