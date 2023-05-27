import { useEffect, useState } from 'react'
import { Validation } from '../tools'
import { useDispatch } from 'react-redux'
import { setErrorInField } from '@/redux'

export const useValidateInput = ({
  inputValue,
  validations,
  sectionKey,
  fieldKey,
}: {
  inputValue: number | string
  validations?: Validation[]
  sectionKey: string
  fieldKey: string
}) => {
  const dispatch = useDispatch()
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

  useEffect(() => {
    if (errors) dispatch(setErrorInField({ sectionKey, fieldKey, error: errors.length !== 0 }))
  }, [errors])

  return { errors }
}
