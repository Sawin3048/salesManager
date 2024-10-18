import { useQuery } from '@tanstack/react-query'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from '@chakra-ui/react'
import { getItems } from '../hooks/useItem'

export default function ListOfItems () {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['items'],
    queryFn: getItems
  })
  if (isError) return <div>{ error.message }</div>
  if (isPending) return <p>Loading....</p>
  // if (!isPending && !isError) return <p>{JSON.stringify(data)}</p>
  return (
    <div className="w-4/5 m-auto">
      <TableContainer border='1px' rounded='2xl'>
        <Table variant="striped" colorScheme="teal">
          <TableCaption> Items </TableCaption>
          <Thead>
            <Th isNumeric> Code </Th>
            <Th> Description </Th>
            <Th isNumeric> Stock </Th>
            <Th isNumeric> Price </Th>
          </Thead>
          <Tbody>
            {data.map((item: any) => {
              return (
                <Tr>
                  <Td isNumeric> {item.code} </Td>
                  <Td> {item.description} </Td>
                  <Td isNumeric> {item.stock} </Td>
                  <Td isNumeric> {item.price.unitaryPrice} </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
