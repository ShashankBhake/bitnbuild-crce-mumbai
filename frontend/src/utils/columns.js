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

export const customerColumnDef = [
    {
        accessorKey: 'id',
        header: 'Id'
    },
    {
        accessorKey: 'Name',
        header: 'Name'
    },
    {
        accessorKey: 'Company',
        header: 'Company'
    },
    {
        accessorKey: 'email',
        header: 'email'
    },
    {
        accessorKey: 'gender',
        header: 'Gender'
    },
    {
        accessorKey: 'Recievables',
        header: 'Recievables'
    },
    {
        accessorKey: 'Unused Credits',
        header: 'Unused Credits'
    },
]

export const vendorColumnDef = [
    {
        accessorKey: 'id',
        header: 'Id'
    },
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'company',
        header: 'Company'
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'phone number',
        header: 'Phone Number'
    },
    {
        accessorKey: 'payables',
        header: 'Payables'
    },
    {
        accessorKey: 'unused credits',
        header: 'Unused Credits'
    },
]