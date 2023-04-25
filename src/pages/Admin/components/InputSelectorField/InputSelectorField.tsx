import { Icon, Spinner } from '@/components'
import { useDarkMode } from '@/hooks'
import { AppStore } from '@/redux/store'
import { ChangeEventHandler, InputHTMLAttributes, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { ErrorList, FieldName } from '..'
import {
  StylizedInputSelectorField,
  inputSelectorFieldAdapter,
  InputSelectorFieldStyleProps,
} from './InputSelectorField.styled'
import { AppError } from '@/tools'
import { useSectionDependency, useValidateInput } from '../../hooks'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { BLANK_SELECTION, Option, STATUS, Validation, reorderBySearch } from '../../tools'
import { css } from 'styled-components'
import { notFontSizeAdapter } from '@/styles'

const InputSelectorField = ({
  action,
  sectionKey,
  dependentSectionKey,
  fieldKey,
  title,
  validations,
  inputExtraAttrs,
  style,
  loadOptions,
}: {
  action: ActionCreatorWithPayload<{
    sectionKey: string
    fieldKey: string
    value: any
  }>
  sectionKey: string
  dependentSectionKey: string
  fieldKey: string
  title: string
  validations?: Validation[]
  inputExtraAttrs?: InputHTMLAttributes<HTMLInputElement>
  style?: InputSelectorFieldStyleProps
  loadOptions: (name?: string) => Promise<AppError | Option[]>
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const [status, setStatus] = useState<STATUS>(STATUS.loading)
  const [writing, setWriting] = useState(false)
  const [selecting, setSelecting] = useState(false)
  const [options, setOptions] = useState<Option[]>([])
  const initialValue = useSelector(
    (store: AppStore) => store.newResourceData[sectionKey][fieldKey]
  ) as string
  const [inputValue, setInputValue] = useState(initialValue || '')
  const { errors } = useValidateInput(inputValue, validations)
  useSectionDependency(setOptions, dependentSectionKey)

  const handleEnter = async () => {
    setSelecting(true)

    if (options.length === 0) {
      setStatus(STATUS.loading)

      const items = await loadOptions()

      if (items && !(items instanceof AppError)) {
        setOptions(items)

        setStatus(STATUS.ready)
      } else setStatus(STATUS.error)
    }
  }

  const handleLeave = () => {
    setSelecting(false)
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.currentTarget

    const optionsCopy = reorderBySearch(value, [...options])

    setOptions(optionsCopy)
    setInputValue(value)
  }

  const handleInputFocus = async () => {
    setWriting(true)
  }

  const handleInputBlur = () => {
    setWriting(false)
    dispatch(action({ sectionKey, fieldKey, value: inputValue }))
  }

  const handleItemChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { id, title } = event.currentTarget

    if (id === BLANK_SELECTION.id) {
      setInputValue('')
      dispatch(action({ sectionKey, fieldKey, value: undefined }))
    } else {
      setInputValue(title)
      dispatch(action({ sectionKey, fieldKey, value: title }))
    }
  }

  const componentsByStatus = {
    [STATUS.loading]: (
      <div className="spinner-container">
        <Spinner
          style={{
            semicircleBackgroundColor: { dark: 'g-10', bright: 'g-4' },
            lineBackgroundColor: { dark: 'g-2', bright: 'g-12' },
          }}
        />
      </div>
    ),
    [STATUS.error]: (
      <Icon
        iconName="fa-solid fa-xmark"
        style={{
          size: 'm',
          styled: css`
            margin-top: ${notFontSizeAdapter('4xs')};
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
            type="radio"
            name="view"
            id={BLANK_SELECTION.id}
            title={BLANK_SELECTION.title}
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
              type="radio"
              checked={inputValue === item.title ? true : undefined}
              name="view"
              id={item.id}
              title={item.title}
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
    <StylizedInputSelectorField p={inputSelectorFieldAdapter(darkMode, style)}>
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
              autoComplete="nope"
              value={inputValue}
              placeholder={BLANK_SELECTION.title}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
            <div className="icon-container" data-expanded={writing || selecting}>
              <Icon iconName="fa-solid fa-chevron-down" style={{ size: 'xs' }} />
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
    </StylizedInputSelectorField>
  )
}

export default InputSelectorField
