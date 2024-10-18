import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import PasswordInput from './PasswordInput'
import { FormEvent } from 'react'
import { FORM } from './const'
import { singIn } from '../../hooks/useSession'

export default function SingInForm () {
  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const cin = form.get(FORM.cin) as string
    const password = form.get(FORM.password) as string

    singIn({ cin, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Cédula</FormLabel>
        <Input name={FORM.cin} pattern='\d*'></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Contraseña</FormLabel>
        <PasswordInput />
      </FormControl>
      <Center>
      <Button type='submit'>Send</Button>
      </Center>
    </form>
  )
}
