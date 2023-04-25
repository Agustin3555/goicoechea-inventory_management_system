import { useEffect, useState } from 'react'
import { Validation } from '../tools'

export const useValidateInput = (inputValue: string, validations?: Validation[]) => {
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (validations) {
      let accumulatedErrors: string[] = []

      for (let i = 0; i < validations.length; i++) {
        const item = validations[i]

        if (item.validation(inputValue)) {
          accumulatedErrors = [...accumulatedErrors, `• ${item.errorMsg}`]

          if (item.break) break
        }
      }

      setErrors(accumulatedErrors)
    }
  }, [inputValue])

  return { errors }
}
