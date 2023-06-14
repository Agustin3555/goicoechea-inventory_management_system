import { AnimateState, Icon, Spinner } from '@/components'
import { useDarkMode } from '@/hooks'
import { ChangeEventHandler, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ErrorList } from '..'
import { AppError } from '@/tools'
import {
  useDefaultValue,
  useDependency,
  useGetInputValue,
  useValidateInput,
} from '../../hooks'
import {
  BLANK_SELECTION,
  FieldSelectorProps,
  Option,
  STATUS,
  reorderBySearch,
} from '../../tools'
import { css } from 'styled-components'
import { COLOR, FONT_SIZE, NOT_FONT_SIZE } from '@/styles'
import { InputSelectorFieldStyled } from './InputSelectorField.styled'
import { setInputValue } from '@/redux'
import { InputSelector } from '@/models'

const InputSelectorField = ({
  fieldData,
  storageAddress,
  fieldDependency = [],
  loadOptions,
  optional = false,
  unlabeled = false,
  style,
}: FieldSelectorProps & { style?: InputSelectorFieldStyled.Props }) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()

  const {
    title,
    sectionDependency,
    validations,
    inputExtraAttrs,
    isNumber,
    defaultValue,
  } = useMemo(() => {
    const { title, extra } = fieldData

    const {
      sectionDependency = [],
      validations,
      inputExtraAttrs,
      defaultValue,
    } = extra as InputSelector

    const isNumber = inputExtraAttrs?.type === 'number'

    return {
      title,
      sectionDependency,
      validations,
      inputExtraAttrs,
      isNumber,
      defaultValue,
    }
  }, [])

  const [writing, setWriting] = useState(false)
  const [selecting, setSelecting] = useState(false)
  const [options, setOptions] = useState<Option[]>([])
  const [status, setStatus] = useState<STATUS>(STATUS.loading)
  const initialInputValue = useGetInputValue({ storageAddress })

  const [thisInputValue, setThisInputValue] = useState(
    initialInputValue as undefined | number | string
  )

  const { errors, notifyError } = useValidateInput({
    storageAddress,
    validations,
    optional,
    inputValue: thisInputValue,
  })

  useDefaultValue({ storageAddress, value: thisInputValue, defaultValue })
  useDependency({ setOptions, sectionDependency, fieldDependency })

  const handleEnter = async () => {
    setSelecting(true)

    // Si las opciones están vacías, serán cargadas
    if (options.length === 0) {
      setStatus(STATUS.loading)

      const items = await loadOptions()

      if (items && !(items instanceof AppError)) {
        setOptions(items)

        setStatus(STATUS.ready)
      } else {
        setStatus(STATUS.error)
      }
    }
  }

  const handleLeave = () => {
    setSelecting(false)
    notifyError()
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.currentTarget

    const optionsCopy = reorderBySearch(value, [...options])
    setOptions(optionsCopy)

    if (value === '') {
      setThisInputValue(undefined)
      return
    }

    let parsedValue: number | string = value
    // Funciona tanto para "int" como para "float"
    if (isNumber) parsedValue = parseFloat(parsedValue)

    setThisInputValue(parsedValue)
  }

  const handleInputFocus = () => {
    setWriting(true)
  }

  const handleInputBlur = () => {
    setWriting(false)
    dispatch(setInputValue({ storageAddress, value: thisInputValue }))
  }

  const handleItemChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { id, title } = event.target

    if (id === BLANK_SELECTION.id) {
      setThisInputValue('')
      dispatch(setInputValue({ storageAddress, value: undefined }))
    } else {
      setThisInputValue(title)

      let parsedValue: number | string = title
      if (isNumber) parsedValue = parseFloat(parsedValue)

      dispatch(setInputValue({ storageAddress, value: parsedValue }))
    }
  }

  const componentsByStatus = {
    [STATUS.loading]: (
      <div className="spinner-container">
        <Spinner
          style={{
            semicircleBackgroundColor: { dark: COLOR.g_10, bright: COLOR.g_4 },
            lineBackgroundColor: { dark: COLOR.g_2, bright: COLOR.g_12 },
          }}
        />
      </div>
    ),
    [STATUS.error]: (
      <Icon
        iconName="fa-solid fa-xmark"
        style={{
          size: FONT_SIZE.m,
          styled: css`
            margin-top: ${NOT_FONT_SIZE['4xs']};
          `,
        }}
      />
    ),
    [STATUS.ready]: (
      <div className="items">
        <div className="item" key={BLANK_SELECTION.id}>
          <label htmlFor={BLANK_SELECTION.id} />
          <input
            className="input"
            id={BLANK_SELECTION.id}
            name="view"
            title={BLANK_SELECTION.title}
            type="radio"
            checked={thisInputValue === undefined ? true : undefined}
            onChange={handleItemChange}
          />
          <div className="fake-input">
            <span className="text">{BLANK_SELECTION.title}</span>
          </div>
        </div>
        {options.map(item => (
          <div className="item" key={item.id}>
            <label htmlFor={item.id} />
            <input
              className="input"
              id={item.id}
              name="view"
              title={item.title}
              type="radio"
              checked={String(thisInputValue) === item.title ? true : undefined}
              onChange={handleItemChange}
            />
            <div className="fake-input">
              <span className="text">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  }

  return (
    <InputSelectorFieldStyled.Component
      p={InputSelectorFieldStyled.adapter(darkMode, style)}
    >
      {!unlabeled && <span className="field-title">{title}</span>}
      <div className="box">
        <div
          className="selector"
          data-expanded={writing || selecting}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div className="selected" title={title}>
            <input
              className="input"
              name={storageAddress}
              value={thisInputValue}
              placeholder={BLANK_SELECTION.title}
              autoComplete="nope"
              {...inputExtraAttrs}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
            <div className="icon-container" data-expanded={writing || selecting}>
              <Icon
                iconName="fa-solid fa-chevron-down"
                style={{ size: FONT_SIZE.xs }}
              />
            </div>
          </div>
          <AnimateState state={String(status)}>
            <div className="animation-container">{componentsByStatus[status]}</div>
          </AnimateState>
        </div>
      </div>
      <ErrorList errors={errors} />
    </InputSelectorFieldStyled.Component>
  )
}

export default InputSelectorField
