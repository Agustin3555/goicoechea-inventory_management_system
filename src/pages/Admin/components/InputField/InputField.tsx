import { Input } from '@/components'
import { AppStore } from '@/redux/store'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { ChangeEventHandler, InputHTMLAttributes, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FieldName from '../FieldName/FieldName'
import { useValidateInput } from '../../hooks'
import { Validation } from '../../tools'
import { ErrorList } from '..'
import { NewResourceAction } from '@/redux'
import { InputFieldStyled } from './InputField.styled'

const InputField = ({
  action,
  sectionKey,
  fieldKey,
  title,
  validations,
  inputExtraAttrs,
}: {
  action: ActionCreatorWithPayload<NewResourceAction>
  sectionKey: string
  fieldKey: string
  title: string
  validations?: Validation[]
  inputExtraAttrs?: InputHTMLAttributes<HTMLInputElement>
}) => {
  const dispatch = useDispatch()
  const initialInputValue = useSelector(
    (store: AppStore) => store.newResourceData[sectionKey][fieldKey]
  ) as string
  const [inputValue, setValue] = useState(initialInputValue || '')
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
