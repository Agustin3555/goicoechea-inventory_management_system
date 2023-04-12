import { Input } from '@/components'
import { AppStore } from '@/redux/store'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import {
  ChangeEventHandler,
  InputHTMLAttributes,
  LegacyRef,
  ReactEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FieldName from '../FieldName/FieldName'
import { StylizedInputField } from './InputField.styled'

const InputField = ({
  action,
  sectionKey,
  fieldKey,
  title,
  validations,
  inputExtraAttrs,
}: {
  action: ActionCreatorWithPayload<{
    sectionKey: string
    fieldKey: string
    value: any
  }>
  sectionKey: string
  fieldKey: string
  title: string
  validations?: {
    validation: (value: any) => boolean
    errorMsg: string
    break: boolean
  }[]
  inputExtraAttrs?: InputHTMLAttributes<HTMLInputElement>
}) => {
  const dispatch = useDispatch()

  const initialValue = useSelector(
    (store: AppStore) => store.newResourceData[sectionKey][fieldKey]
  )

  const [value, setValue] = useState(initialValue || '')
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

  useEffect(() => validate(), [])

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.currentTarget

    setValue(value)
    validate()
  }

  const handleBlur = () => {
    validate()
    dispatch(action({ sectionKey, fieldKey, value }))
  }

  return (
    <StylizedInputField>
      <FieldName title={title} />
      <Input
        showLabel={false}
        name={fieldKey}
        title={title}
        style={{ width: '3xl' }}
        extraAttrs={{
          onChange: handleChange,
          onBlur: handleBlur,
          value,
          ...inputExtraAttrs,
        }}
      />
      <div className="errors">
        {errors.map(error => (
          <p className="item">{error}</p>
        ))}
      </div>
    </StylizedInputField>
  )
}

export default InputField
