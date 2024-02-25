import {
    Container,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react'
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import React from 'react'
import { columnDef } from '../utils/columns'
import itemsData from '../utils/items.json'
const TableComponent = () => {

    const finalData = React.useMemo(() => {
        itemsData
    }, [])

    const finalColumn = React.useMemo(() => {
        columnDef
    }, [])

    const tableInstance = useReactTable({
        columns: columnDef,
        data: itemsData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true
    })

    console.log("test", tableInstance.getHeaderGroups())

    return (
        <Container maxW={'100vw'} width={'100%'} height={'100vh'} >

            <TableContainer p={10} ml={'30px'}  >
                <Table variant='striped' colorScheme='gray' >
                    <TableCaption>Items Data</TableCaption>

                    <Thead backgroundColor={'#666'}  >
                        {
                            tableInstance.getHeaderGroups().map((headerEl) => {
                                return <Tr key={headerEl.id} >
                                    {
                                        headerEl.headers.map((columnEl) => {
                                            return <Th key={columnEl.id} color={'black'} colSpan={columnEl.colSpan} >
                                                {
                                                    flexRender(
                                                        columnEl.column.columnDef.header,
                                                        columnEl.getContext()
                                                    )
                                                }
                                            </Th>
                                        })
                                    }
                                </Tr>
                            })
                        }
                    </Thead>

                    <Tbody>
                        {
                            tableInstance.getRowModel().rows.map((rowEl) => {
                                return <Tr key={rowEl.id} >
                                    {
                                        rowEl.getVisibleCells().map((cellEl) => {
                                            return <Td key={cellEl.id}>
                                                {
                                                    flexRender(cellEl.column.columnDef.cell, cellEl.getContext())
                                                }
                                            </Td>
                                        })
                                    }
                                </Tr>
                            })
                        }
                    </Tbody>
                </Table>
                <div className="h-2" />

                <div className="flex items-center gap-2">

                    <button
                        className="border rounded p-1"
                        onClick={() => tableInstance.setPageIndex(0)}
                        disabled={!tableInstance.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>



                    <button
                        className="border rounded p-1"
                        onClick={() => tableInstance.previousPage()}
                        disabled={!tableInstance.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>


                    <button
                        className="border rounded p-1"
                        onClick={() => tableInstance.nextPage()}
                        disabled={!tableInstance.getCanNextPage()}
                    >
                        {'>'}
                    </button>



                    <button
                        className="border rounded p-1"
                        onClick={() => tableInstance.setPageIndex(tableInstance.getPageCount() - 1)}
                        disabled={!tableInstance.getCanNextPage()}
                    >
                        {'>>'}
                    </button>






                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {tableInstance.getState().pagination.pageIndex + 1} of{' '}
                            {tableInstance.getPageCount()}
                        </strong>
                    </span>




                    <span className="flex items-center gap-1">
                        | Go to page:
                        <input
                            type="number"
                            defaultValue={tableInstance.getState().pagination.pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                tableInstance.setPageIndex(page)
                            }}
                            className="border p-1 rounded w-16"
                        />
                    </span>




                    <select
                        value={tableInstance.getState().pagination.pageSize}
                        onChange={e => {
                            tableInstance.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>




                </div>

  
            </TableContainer>

        </Container>
    )
}

export default TableComponent
