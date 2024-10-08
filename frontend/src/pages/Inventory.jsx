import { Container, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import TableComponent from '../components/Table'

const Inventory = () => {
  const [loading, setLoading] = useState(false)
  return (
    <Container maxW={'100vw'} width={'100%'} height={'100vh'}  >
        <Text fontSize={'2xl'} textAlign={'center'}   >Items</Text>
        <TableComponent/>
    </Container>
  )
}

export default Inventory
