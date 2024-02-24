import React from 'react'
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table'
import itemsData from '../utils/items.json'
import { columnDef } from '../utils/columns'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Container,
} from '@chakra-ui/react'
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
        getCoreRowModel: getCoreRowModel()
    })

    console.log("test", tableInstance.getHeaderGroups())

    return (
        <Container maxW={'100vw'} width={'100%'} height={'100vh'} >

            <TableContainer p={10} ml={'30px'}  >
                <Table variant='striped' colorScheme='gray' >
                    <TableCaption>Items Data</TableCaption>

                    <Thead backgroundColor={'#67f0b7'}  >
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
            </TableContainer>
        </Container>
    )
}

export default TableComponent
