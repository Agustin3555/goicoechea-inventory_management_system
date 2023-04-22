import { Input } from '@/components'
import { AppStore } from '@/redux/store'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { ChangeEventHandler, InputHTMLAttributes, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FieldName from '../FieldName/FieldName'
import { StylizedInputField } from './InputField.styled'
import { Validation, useValidateInput } from '../../hooks'

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
  validations?: Validation[]
  inputExtraAttrs?: InputHTMLAttributes<HTMLInputElement>
}) => {
  const dispatch = useDispatch()
  const initialValue = useSelector(
    (store: AppStore) => store.newResourceData[sectionKey][fieldKey]
  ) as string
  const [value, setValue] = useState(initialValue || '')
  const { errors, validate } = useValidateInput(value, validations)

  useEffect(() => {
    validate()
  }, [])

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
