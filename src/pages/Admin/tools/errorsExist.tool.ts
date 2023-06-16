import { InputErrorsState } from '@/redux'

export const errorsExist = (errors: InputErrorsState | undefined): boolean => {
  // Si no hay errores, se retorna false
  if (!errors) return false

  for (const key in errors) {
    const error = errors[key]

    // Si se encuentra un error con valor "true", se retorna true
    if (error === true) return true

    if (typeof error === 'object') {
      const nestedErrorsExist = errorsExist(error)

      // Si se encuentra un error en los objetos anidados, se retorna true
      if (nestedErrorsExist) return true
    }
  }

  return false // Si no se encuentra ningún error, se retorna false
}
