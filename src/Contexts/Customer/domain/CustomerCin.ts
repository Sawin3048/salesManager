import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'
import { StringValueObject } from '../../Shared/domain/value-object/StringValueObject'

export class CustomerRUC extends StringValueObject {
  readonly value

  constructor(ruc: string) {
    super(ruc, 'ruc')
    this.value = this.ensureIsValid(ruc)
  }

  private ensureIsValid(value: string): string {
    const shema = Joi.string().exist().min(1)
    return validateShema({ shema, value, propertyName: 'ruc' })
  }

  private verifyRUC(ruc: string, baseMax = 11) {
    let rucTransformado = ''
    let sumaTotal = 0
    let multiplicador = 2

    // Convertir caracteres no numéricos a su valor ASCII
    for (let i = 0; i < ruc.length; i++) {
      const caracter = ruc[i].toUpperCase()
      const codigoAscii = caracter.charCodeAt(0)

      if (codigoAscii >= 48 && codigoAscii <= 57) {
        // Si es un número (0-9)
        rucTransformado += caracter
      } else {
        // Si es una letra u otro carácter lo convierte el su valor numerico en Ascii
        // ej:'A' se convertira en 65 y 'B' en 66
        rucTransformado += codigoAscii.toString()
      }
    }

    // Calcular la suma total utilizando el algoritmo
    for (let i = rucTransformado.length - 1; i >= 0; i--) {
      if (multiplicador > baseMax) {
        multiplicador = 2
      }
      const numeroActual = parseInt(rucTransformado[i], 10)
      sumaTotal += numeroActual * multiplicador
      multiplicador++
    }

    // Obtener el dígito verificador
    const resto = sumaTotal % 11
    const digitoVerificador = resto > 1 ? 11 - resto : 0

    return digitoVerificador
  }
}
