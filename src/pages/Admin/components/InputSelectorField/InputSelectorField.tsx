import { Icon, Separator, Spinner } from '@/components'
import { useDarkMode } from '@/hooks'
import { setActiveViews } from '@/redux/states/activeViews.state'
import { AppStore } from '@/redux/store'
import { ChangeEventHandler, FocusEventHandler, InputHTMLAttributes, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { FieldName } from '..'
import {
  StylizedInputSelectorField,
  inputSelectorFieldAdapter,
  InputSelectorFieldStyleProps,
} from './InputSelectorField.styled'

interface Item {
  id: string
  title: string
}

const InputSelectorField = ({
  sectionId,
  loadResources,
  title,
  variable = true,
  extraAttrs,
  style,
}: {
  sectionId: string
  loadResources: (name?: string) => Promise<Item[]>
  title: string
  variable?: boolean
  extraAttrs?: InputHTMLAttributes<HTMLInputElement>
  style?: InputSelectorFieldStyleProps
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const [writing, setWriting] = useState(false)
  const [selecting, setSelecting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState<Item[]>([])

  const handleInputFocus = async () => {
    setWriting(true)
    setLoading(true)

    try {
      const items = await loadResources()
      setOptions(items)
    } catch (error) {}

    setLoading(false)
  }

  const handleInputBlur = () => setWriting(false)
  const handleToggleExpanded = () => setWriting(!writing)
  const handleEnter = () => setSelecting(true)
  const handleLeave = () => setSelecting(false)

  const handleChange = () => {}

  return (
    <StylizedInputSelectorField p={inputSelectorFieldAdapter(darkMode, variable, style)}>
      <FieldName title={title} />
      <div className="selector-container" data-expanded={writing || selecting}>
        <div
          className="selected"
          title={variable ? undefined : 'title'}
          onClick={variable ? undefined : handleToggleExpanded}
        >
          {variable ? (
            <input
              className="input"
              name={'name'}
              title={'title'}
              autoComplete="nope"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              {...extraAttrs}
            />
          ) : (
            <>
              <span className="text">Text</span>
              <Separator style={{ long: '2xs', backgroundColor: { dark: 'g-8' } }} />
            </>
          )}
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
            <div
              className="animation-container"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              {loading ? (
                <div className="spinner-container">
                  <Spinner
                    style={{
                      semicircleBackgroundColor: { dark: 'g-10', bright: 'g-4' },
                      lineBackgroundColor: { dark: 'g-2', bright: 'g-12' },
                    }}
                  />
                </div>
              ) : (
                <div className="items">
                  {options.map(item => (
                    <div className="item" key={item.id}>
                      <label htmlFor={item.id} />
                      <input
                        className="input"
                        type="radio"
                        name="view"
                        id={item.id}
                        title={item.title}
                        onChange={handleChange}
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
    </StylizedInputSelectorField>
  )
}

export default InputSelectorField
