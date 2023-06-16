import { useEffect, useState } from 'react'
import { Validation } from '../tools'
import { useDispatch } from 'react-redux'
import { setInputError } from '@/redux'
import { ERRORS, ERROR_MATCHER } from '@/tools'

// Regla de validación para campos obligatorios
const requiredValidation: Validation = {
  validation: value => value === undefined || value === '',
  errorMsg: ERROR_MATCHER[ERRORS.client_fieldRequired],
  break: true,
}

export const useValidateInput = ({
  storageAddress,
  validations = [],
  optional,
  inputValue,
}: {
  storageAddress: string
  validations?: Validation[]
  optional: boolean
  inputValue?: number | string
}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState<string[]>([])
  const [hasExecutedEffect, setHasExecutedEffect] = useState(false)

  validations = optional ? validations : [requiredValidation, ...validations]

  useEffect(() => {
    if (validations.length !== 0) {
      let accumulatedErrors: string[] = []

      // Se recorren las reglas de validación y se acumulan los errores encontrados
      for (let i = 0; i < validations.length; i++) {
        const validationRule = validations[i]

        if (validationRule.validation(inputValue)) {
          accumulatedErrors = [...accumulatedErrors, `• ${validationRule.errorMsg}`]

          if (validationRule.break) break
        }
      }

      setErrors(accumulatedErrors)

      // Si el efecto no se ha ejecutado antes, se realiza la acción correspondiente
      if (!hasExecutedEffect) {
        const hasErrors = accumulatedErrors.length !== 0
        dispatch(setInputError({ storageAddress, error: hasErrors }))

        setHasExecutedEffect(true)
      }
    }
  }, [inputValue])

  // Función para notificar los errores manualmente
  const notifyError = () => {
    const hasErrors = errors.length !== 0
    dispatch(setInputError({ storageAddress, error: hasErrors }))
  }

  return { errors, notifyError }
}
