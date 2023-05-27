import { Icon, Spinner } from '@/components'
import { useDarkMode } from '@/hooks'
import { ChangeEventHandler, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { ErrorList, FieldName } from '..'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { AppError, ResourceAction } from '@/tools'
import { css } from 'styled-components'
import { COLOR, FONT_SIZE, NOT_FONT_SIZE } from '@/styles'
import {
  BLANK_SELECTION,
  Option,
  STATUS,
  reorderBySearch,
  requiredValidation,
} from '../../tools'
import { FieldDependency, useDependency, useValidateInput } from '../../hooks'
import { SelectorFieldStyled } from './SelectorField.styled'
import { SECTION_KEYS } from '@/models'

const SelectorField = ({
  action,
  sectionKey,
  sectionDependency = [],
  fieldKey,
  fieldDependency = [],
  title,
  required,
  label = false,
  style,
  loadOptions,
}: {
  action: ActionCreatorWithPayload<ResourceAction>
  sectionKey: SECTION_KEYS
  sectionDependency?: SECTION_KEYS[]
  fieldKey: string
  fieldDependency?: FieldDependency
  title: string
  required?: boolean
  label?: boolean
  style?: SelectorFieldStyled.Props
  loadOptions: () => Promise<AppError | Option[]>
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const [status, setStatus] = useState<STATUS>(STATUS.loading)
  const [writing, setWriting] = useState(false)
  const [selecting, setSelecting] = useState(false)
  const [options, setOptions] = useState<Option[]>([])
  const [selectedOption, setSelectedOption] = useState<Option>()
  // TODO: iniciar con el valor del state de Redux
  const [inputValue, setInputValue] = useState('')

  const { errors } = useValidateInput({
    inputValue,
    validations: required ? [requiredValidation] : undefined,
    sectionKey,
    fieldKey,
  })

  // useDependency({ setOptions, sectionKey, sectionDependency, fieldDependency })

  const handleEnter = async () => {
    setSelecting(true)

    if (options.length === 0) {
      setStatus(STATUS.loading)

      const items = await loadOptions()

      if (items && !(items instanceof AppError)) {
        setOptions(items)

        if (selectedOption) {
          const updatedSelectedOption = items.find(item => item.id === selectedOption.id)

          // TODO: testear esto cuando tenga la posibilidad de actualisar o eliminar los recursos
          if (updatedSelectedOption)
            setSelectedOption({ id: selectedOption.id, title: updatedSelectedOption.title })
          else {
            dispatch(action({ sectionKey, fieldKey, value: undefined }))
            setSelectedOption(undefined)
          }
        }

        setStatus(STATUS.ready)
      } else setStatus(STATUS.error)
    }
  }

  const handleLeave = () => {
    setSelecting(false)
  }

  const handleInputFocus = () => {
    setWriting(true)
  }

  const handleInputBlur = () => {
    setInputValue(selectedOption?.title || '')

    setWriting(false)
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.currentTarget

    const optionsCopy = reorderBySearch(value, [...options])

    setOptions(optionsCopy)
    setInputValue(value)
  }

  const handleItemChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { id, title } = event.currentTarget

    if (id === BLANK_SELECTION.id) {
      dispatch(action({ sectionKey, fieldKey, value: undefined }))
      setSelectedOption(undefined)
      setInputValue('')
    } else {
      dispatch(action({ sectionKey, fieldKey, value: parseInt(id) }))
      setSelectedOption({ id, title })
      setInputValue(title)
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
            checked={inputValue === '' ? true : undefined}
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
      <FieldName title={title} />
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
              name={fieldKey}
              value={inputValue}
              placeholder={BLANK_SELECTION.title}
              autoComplete="nope"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
            <div className="icon-container" data-expanded={writing || selecting}>
              <Icon iconName="fa-solid fa-chevron-down" style={{ size: FONT_SIZE.xs }} />
            </div>
          </div>
          <SwitchTransition>
            <CSSTransition
              key={status}
              classNames="fade"
              addEndListener={(node, done) =>
                node.addEventListener('transitionend', done, false)
              }
            >
              <div className="animation-container">{componentsByStatus[status]}</div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
      <ErrorList errors={errors} />
    </SelectorFieldStyled.Component>
  )
}

export default SelectorField
