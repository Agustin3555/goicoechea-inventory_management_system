import { ChangeEventHandler, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useDefaultValue, useGetInputValue } from '../../hooks'
import { FieldProps } from '../../tools'
import { CheckboxFieldStyled } from './CheckboxField.styled'
import { setInputValue } from '@/redux'
import { useDarkMode } from '@/hooks'
import { AnimateState, Icon } from '@/components'
import { FONT_SIZE, NOT_FONT_SIZE } from '@/styles'
import { css } from 'styled-components'
import { Checkbox } from '@/models'

const CheckboxField = ({
  fieldData,
  storageAddress,
  unlabeled = false,
  style,
}: FieldProps & { style?: CheckboxFieldStyled.Props }) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()

  const { title, defaultValue } = useMemo(() => {
    const { title, extra } = fieldData
    const { defaultValue } = extra as Checkbox

    return { title, defaultValue }
  }, [])

  const inputValue = useGetInputValue({ storageAddress }) as undefined | boolean
  useDefaultValue({ storageAddress, value: inputValue, defaultValue })

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { checked } = event.target

    dispatch(setInputValue({ storageAddress, value: checked }))
  }

  return (
    <CheckboxFieldStyled.Component p={CheckboxFieldStyled.adapter(darkMode, style)}>
      {!unlabeled && <span className="field-title">{title}</span>}
      <div className="checkbox">
        <label htmlFor={storageAddress} />
        <input
          className="input"
          type="checkbox"
          id={storageAddress}
          title={title}
          checked={inputValue}
          onChange={handleInputChange}
        />
        <div className="fake-input">
          <div className="box">
            <div className="icon-HC">
              <Icon
                iconName="fa-solid fa-check"
                style={{
                  styled: css`
                    .icon {
                      font-size: calc(${FONT_SIZE['2xs']} + ${NOT_FONT_SIZE['5xs']});
                    }
                  `,
                }}
              />
            </div>
          </div>
          <AnimateState state={String(inputValue)}>
            <span className="value">{inputValue ? 'Si' : 'No'}</span>
          </AnimateState>
        </div>
      </div>
    </CheckboxFieldStyled.Component>
  )
}

export default CheckboxField
