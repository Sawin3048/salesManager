import { asClass, createContainer } from 'awilix'

class Persona {
  private readonly name
  constructor({ name }: { name: string }) {
    this.name = name
  }

  getName() {
    return this.name
  }
}

class Saludador {
  private readonly persona
  constructor({ persona }: { persona: Persona }) {
    this.persona = persona
  }

  saludar() {
    console.log('Hola como estas: ' + this.persona.getName())
  }
}

const container = createContainer()
container.register({
  persona: asClass(Persona).inject(() => ({ name: 'Juan' })),
  'service.saludador': asClass(Saludador)
})
// const s = container.resolve('service.persona')
// console.log(s.getName())

const s = container.resolve<Saludador>('service.saludador')
s.saludar()
