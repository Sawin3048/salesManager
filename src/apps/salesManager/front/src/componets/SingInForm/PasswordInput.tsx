import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useBoolean
} from '@chakra-ui/react'
import { FORM } from './const'

export default function PasswordInput () {
  const [show, { toggle }] = useBoolean()

  return (
    <InputGroup size="md">
          <Input
            name={FORM.password}
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={toggle}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
  )
}
