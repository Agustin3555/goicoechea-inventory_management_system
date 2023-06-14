import { ChangeEventHandler, KeyboardEventHandler, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDefaultValue, useGetInputValue, useValidateInput } from '../../hooks'
import { FieldOptionalProps } from '../../tools'
import { ErrorList } from '..'
import { InputFieldStyled } from './InputField.styled'
import { setInputValue } from '@/redux'
import { useDarkMode } from '@/hooks'
import { Input } from '@/models'

const InputField = ({
  fieldData,
  storageAddress,
  asTextArea = false,
  optional = false,
  unlabeled = false,
  style,
}: FieldOptionalProps & {
  asTextArea?: boolean
  style?: InputFieldStyled.Props
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()

  const { title, validations, inputExtraAttrs, isNumber, defaultValue } =
    useMemo(() => {
      const { title, extra } = fieldData
      const { validations, inputExtraAttrs, defaultValue } = extra as Input
      const isNumber = inputExtraAttrs?.type === 'number'

      return {
        title,
        validations,
        inputExtraAttrs,
        isNumber,
        defaultValue,
      }
    }, [])

  const initialInputValue = useGetInputValue({ storageAddress })

  const [inputValue, setValue] = useState(
    initialInputValue as undefined | number | string
  )

  const { errors, notifyError } = useValidateInput({
    storageAddress,
    validations,
    optional,
    inputValue,
  })

  useDefaultValue({ storageAddress, value: inputValue, defaultValue })

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target

    if (value === '') {
      setValue(undefined)
      return
    }

    let parsedValue: number | string = value
    // Funciona tanto para "int" como para "float"
    if (isNumber) parsedValue = parseFloat(parsedValue)

    setValue(parsedValue)
  }

  const handleBlur = () => {
    dispatch(setInputValue({ storageAddress, value: inputValue }))
    notifyError()
  }

  const handleTextareaChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
    const { value } = event.target

    if (value === '') {
      setValue(undefined)
      return
    }

    let parsedValue: number | string = value
    // Funciona tanto para "int" como para "float"
    if (isNumber) parsedValue = parseFloat(parsedValue)

    setValue(parsedValue)
  }

  const handleTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = event => {
    if (event.key === 'Tab') {
      event.preventDefault()

      const { selectionStart, selectionEnd, value } = event.target

      /*
        Crea el nuevo valor del textarea agregando un tab (\t) en la posición del
        cursor
      */
      const newValue =
        value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd)

      // Actualiza el valor del textarea con el nuevo valor
      event.target.value = newValue

      // Establece la posición del cursor después del tab recién insertado
      event.target.setSelectionRange(selectionStart + 1, selectionStart + 1)
    }
  }

  return (
    <InputFieldStyled.Component p={InputFieldStyled.adapter(darkMode, style)}>
      {!unlabeled && <span className="field-title">{title}</span>}
      <div>
        <label htmlFor={storageAddress} />
        {asTextArea ? (
          <textarea
            className="input area"
            value={inputValue}
            name={storageAddress}
            title={title}
            onChange={handleTextareaChange}
            onBlur={handleBlur}
            onKeyDown={handleTextareaKeyDown}
          />
        ) : (
          <input
            className="input"
            value={inputValue}
            name={storageAddress}
            title={title}
            onChange={handleInputChange}
            onBlur={handleBlur}
            {...inputExtraAttrs}
          />
        )}
      </div>
      <ErrorList errors={errors} />
    </InputFieldStyled.Component>
  )
}

export default InputField
