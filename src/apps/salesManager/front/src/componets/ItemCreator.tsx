import { FormControl, FormLabel, Input } from '@chakra-ui/react'

export default function ItemCreator () {
  return (
    <form action="">
      <FormControl>
        <FormLabel> Item Description </FormLabel>
        <Input placeholder='Description'></Input>
      </FormControl>
    </form>
  )
}
