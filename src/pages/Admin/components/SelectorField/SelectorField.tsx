import { AnimateState, Icon, Spinner } from '@/components'
import { useDarkMode } from '@/hooks'
import { ChangeEventHandler, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ErrorList } from '..'
import { AppError } from '@/tools'
import { css } from 'styled-components'
import { COLOR, FONT_SIZE, NOT_FONT_SIZE } from '@/styles'
import {
  BLANK_SELECTION,
  FieldSelectorProps,
  Option,
  STATUS,
  reorderBySearch,
} from '../../tools'
import { useDependency, useValidateInput } from '../../hooks'
import { SelectorFieldStyled } from './SelectorField.styled'
import { setInputValue } from '@/redux'
import { Selector } from '@/models'

const SelectorField = ({
  fieldData,
  storageAddress,
  fieldDependency = [],
  loadOptions,
  optional = false,
  unlabeled = false,
  style,
}: FieldSelectorProps & { style?: SelectorFieldStyled.Props }) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()

  const { title, sectionDependency } = useMemo(() => {
    const { title, extra } = fieldData
    const { sectionDependency = [] } = extra as Selector

    return { title, sectionDependency }
  }, [])

  const [status, setStatus] = useState<STATUS>(STATUS.loading)
  const [writing, setWriting] = useState(false)
  const [selecting, setSelecting] = useState(false)
  const [options, setOptions] = useState<Option[]>([])
  const [selectedOption, setSelectedOption] = useState<Option>()
  // TODO: iniciar con el valor del state de Redux
  const [thisInputValue, setThisInputValue] = useState('')

  const { errors, notifyError } = useValidateInput({
    storageAddress,
    optional,
    inputValue: thisInputValue,
  })

  useDependency({ setOptions, sectionDependency, fieldDependency })

  const handleEnter = async () => {
    setSelecting(true)

    if (options.length === 0) {
      setStatus(STATUS.loading)

      const items = await loadOptions()

      if (items && !(items instanceof AppError)) {
        setOptions(items)

        if (selectedOption) {
          const updatedSelectedOption = items.find(
            item => item.id === selectedOption.id
          )

          // TODO: testear esto cuando tenga la posibilidad de actualisar o eliminar los recursos
          if (updatedSelectedOption)
            setSelectedOption({
              id: selectedOption.id,
              title: updatedSelectedOption.title,
            })
          else {
            dispatch(setInputValue({ storageAddress, value: undefined }))
            setSelectedOption(undefined)
          }
        }

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

  const handleInputFocus = () => {
    setWriting(true)
  }

  const handleInputBlur = () => {
    setThisInputValue(selectedOption?.title || '')

    setWriting(false)
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.currentTarget

    const optionsCopy = reorderBySearch(value, [...options])

    setOptions(optionsCopy)
    setThisInputValue(value)
  }

  const handleItemChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { id, title } = event.currentTarget

    if (id === BLANK_SELECTION.id) {
      dispatch(setInputValue({ storageAddress, value: undefined }))
      setSelectedOption(undefined)
      setThisInputValue('')
    } else {
      dispatch(setInputValue({ storageAddress, value: parseInt(id) }))
      setSelectedOption({ id, title })
      setThisInputValue(title)
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
            checked={thisInputValue === '' ? true : undefined}
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
              checked={selectedOption?.id === item.id ? true : undefined}
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
    <SelectorFieldStyled.Component p={SelectorFieldStyled.adapter(darkMode, style)}>
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
    </SelectorFieldStyled.Component>
  )
}

export default SelectorField
