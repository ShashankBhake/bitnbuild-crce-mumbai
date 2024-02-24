import {createColumnHelper} from '@tanstack/react-table'


const columnHelper = createColumnHelper()
;



export const columnDef = [
    {
        accessorKey: 'Name',
        header: 'Name'
    },
    {
        accessorKey: 'SKU',
        header: 'SKU'
    },
    {
        accessorKey: 'Description',
        header: 'Description'
    },
    {
        accessorKey: 'Rate',
        header: 'Rate'
    }
]