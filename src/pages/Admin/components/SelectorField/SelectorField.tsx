import { Icon, Spinner } from '@/components'
import { useDarkMode } from '@/hooks'
import { setActiveViews } from '@/redux/states/activeViews.state'
import { AppStore } from '@/redux/store'
import { ChangeEventHandler, FocusEventHandler, InputHTMLAttributes, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { FieldName } from '..'
import {
  StylizedSelectorField,
  selectorFieldAdapter,
  SelectorFieldStyleProps,
} from './SelectorField.styled'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

const blankSelection = {
  id: 'blank',
  title: '~',
}

interface Option {
  id: string
  title: string
}

/*
Cuando se toque por primera ves que cargue los items.
Si se detecta un cambio en los recursos que se hbilite la opcion de que cuando
lo toque otra ves que se cargue los items de nuevo.
*/

const SelectorField = ({
  action,
  sectionKey,
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
  fieldKey: string
  title: string
  required?: boolean
  loadOptions: (name?: string) => Promise<Option[] | undefined>
  extraAttrs?: InputHTMLAttributes<HTMLInputElement>
  style?: SelectorFieldStyleProps
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const [writing, setWriting] = useState(false)
  const [selecting, setSelecting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState<Option[]>([])
  const [optionSelected, setOptionSelected] = useState<Option>()
  const [inputValue, setInputValue] = useState('') // TODO: sacar el valor por redux
  const [errorRequired, setErrorRequired] = useState(false) // TODO: sacar el valor por redux

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

  const handleInputFocus = async () => {
    setWriting(true)
    setLoading(true)

    const items = await loadOptions()
    if (items) setOptions(items)

    setLoading(false)
  }

  const handleInputBlur = () => {
    setInputValue(optionSelected?.title || '')

    setWriting(false)
  }

  const handleEnter = () => setSelecting(true)
  const handleLeave = () => setSelecting(false)

  const handleItemChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { id, title } = event.currentTarget

    if (id === blankSelection.id) {
      if (required) setErrorRequired(true)

      dispatch(action({ sectionKey, fieldKey, value: undefined }))
      setOptionSelected(undefined)
      setInputValue('')
    } else {
      if (required) setErrorRequired(false)

      dispatch(action({ sectionKey, fieldKey, value: parseInt(id) }))
      setOptionSelected({ id, title })
      setInputValue(title)
    }
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
              key={loading.toString()}
              classNames="fade"
              addEndListener={(node, done) =>
                node.addEventListener('transitionend', done, false)
              }
            >
              <div className="animation-container">
                {loading ? (
                  <div className="spinner-container">
                    <Spinner
                      style={{
                        semicircleBackgroundColor: { dark: 'g-10', bright: 'g-4' },
                        lineBackgroundColor: { dark: 'g-2', bright: 'g-12' },
                      }}
                    />
                    <Icon iconName="fa-solid fa-xmark" style={{ size: 'm' }}></Icon>
                  </div>
                ) : (
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
                )}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
      {errorRequired && <p className="error-required">• Campo obligatorio</p>}
    </StylizedSelectorField>
  )
}

export default SelectorField
