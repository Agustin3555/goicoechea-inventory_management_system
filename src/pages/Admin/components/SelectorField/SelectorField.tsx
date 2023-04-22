import { Icon, Spinner } from '@/components'
import { useDarkMode } from '@/hooks'
import { AppStore } from '@/redux/store'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { FieldName } from '..'
import {
  StylizedSelectorField,
  selectorFieldAdapter,
  SelectorFieldStyleProps,
} from './SelectorField.styled'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { AppError } from '@/tools'
import { css } from 'styled-components'
import { notFontSizeAdapter } from '@/styles'

const blankSelection = {
  id: 'blank',
  title: '~',
}

interface Option {
  id: string
  title: string
}

enum STATUS {
  loading,
  error,
  ready,
}

const SelectorField = ({
  action,
  sectionKey,
  dependentSectionKey,
  fieldKey,
  title,
  required = false,
  loadOptions,
  style,
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
  required?: boolean
  loadOptions: (name?: string) => Promise<AppError | Option[]>
  style?: SelectorFieldStyleProps
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const [status, setStatus] = useState<STATUS>(STATUS.loading)
  const [writing, setWriting] = useState(false)
  const [selecting, setSelecting] = useState(false)
  const [options, setOptions] = useState<Option[]>([])
  const [selectedOption, setSelectedOption] = useState<Option>()
  const [inputValue, setInputValue] = useState('') // TODO: sacar el valor por redux
  const [errorRequired, setErrorRequired] = useState(false) // TODO: sacar el valor por redux
  const dataUpdates = useSelector(
    (store: AppStore) => store.updatesOfSections[dependentSectionKey]
  )

  useEffect(() => {
    setOptions([])
  }, [dataUpdates])

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.currentTarget

    const optionsCopy = [...options].sort((a, b) => {
      const aTitle = a.title.toLowerCase()
      const bTitle = b.title.toLowerCase()

      const aIndex = aTitle.indexOf(value.toLowerCase())
      const bIndex = bTitle.indexOf(value.toLowerCase())

      if (aIndex === -1 && bIndex === -1) return aTitle.localeCompare(bTitle)
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })

    setOptions(optionsCopy)
    setInputValue(value)
  }

  const handleInputFocus = () => {
    setWriting(true)
  }

  const handleInputBlur = () => {
    setInputValue(selectedOption?.title || '')

    setWriting(false)
  }

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

  const handleLeave = () => setSelecting(false)

  const handleItemChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { id, title } = event.currentTarget

    if (id === blankSelection.id) {
      if (required) setErrorRequired(true)

      dispatch(action({ sectionKey, fieldKey, value: undefined }))
      setSelectedOption(undefined)
      setInputValue('')
    } else {
      if (required) setErrorRequired(false)

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
        <div className="item" key={blankSelection.id}>
          <label htmlFor={blankSelection.id} />
          <input
            className="input"
            type="radio"
            name="view"
            id={blankSelection.id}
            title={blankSelection.title}
            onChange={handleItemChange}
          />
          <div className="fake-input">
            <span className="text">{blankSelection.title}</span>
          </div>
        </div>
        {options.map(item => (
          <div className="item" key={item.id}>
            <label htmlFor={item.id} />
            <input
              className="input"
              type="radio"
              checked={selectedOption?.id === item.id ? true : undefined}
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
    <StylizedSelectorField p={selectorFieldAdapter(darkMode, style)}>
      <FieldName title={title} />
      <div className="box-selector">
        <div
          className="selector-field-container"
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
              placeholder={blankSelection.title}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
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
      {errorRequired && <p className="error-required">• Campo obligatorio</p>}
    </StylizedSelectorField>
  )
}

export default SelectorField
