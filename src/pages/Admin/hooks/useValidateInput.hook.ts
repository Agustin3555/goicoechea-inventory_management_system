import { useState } from 'react'

export interface Validation {
  validation: (value: any) => boolean
  errorMsg: string
  break: boolean
}

export const useValidateInput = (value: string, validations?: Validation[]) => {
  const [errors, setErrors] = useState<string[]>([])

  const validate = () => {
    if (validations) {
      let accumulatedErrors: string[] = []

      for (let i = 0; i < validations.length; i++) {
        const item = validations[i]

        if (item.validation(value)) {
          accumulatedErrors = [...accumulatedErrors, `• ${item.errorMsg}`]

          if (item.break) break
        }
      }

      setErrors(accumulatedErrors)
    }
  }

  return { errors, validate }
}
