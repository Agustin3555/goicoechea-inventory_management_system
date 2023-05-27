import { Input } from '@/components'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { ChangeEventHandler, InputHTMLAttributes, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FieldName from '../FieldName/FieldName'
import { useValidateInput } from '../../hooks'
import { Validation } from '../../tools'
import { ErrorList } from '..'
import { InputFieldStyled } from './InputField.styled'
import { SECTION_KEYS } from '@/models'
import { AppStore } from '@/redux'
import { ResourceAction } from '@/tools'

const InputField = ({
  action,
  sectionKey,
  fieldKey,
  title,
  validations,
  inputExtraAttrs,
}: {
  action: ActionCreatorWithPayload<ResourceAction>
  sectionKey: SECTION_KEYS
  fieldKey: string
  title: string
  validations?: Validation[]
  inputExtraAttrs?: InputHTMLAttributes<HTMLInputElement>
}) => {
  const dispatch = useDispatch()

  const initialInputValue = useSelector((store: AppStore) => {
    const value = store.newResourceData[sectionKey]?.[fieldKey]
    return typeof value === 'boolean' ? '' : value ?? ''
  })

  const [inputValue, setValue] = useState(initialInputValue)
  const { errors } = useValidateInput({ inputValue, validations, sectionKey, fieldKey })

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.currentTarget

    setValue(value)
  }

  const handleInputBlur = () => {
    dispatch(action({ sectionKey, fieldKey, value: inputValue }))
  }

  return (
    <InputFieldStyled.Component>
      <FieldName title={title} />
      <Input
        showLabel={false}
        name={fieldKey}
        title={title}
        extraAttrs={{
          onChange: handleInputChange,
          onBlur: handleInputBlur,
          value: inputValue,
          ...inputExtraAttrs,
        }}
      />
      <ErrorList errors={errors} />
    </InputFieldStyled.Component>
  )
}

export default InputField
