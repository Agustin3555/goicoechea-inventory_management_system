import { useDarkMode } from '@/hooks'
import { CheckboxButtonStyled } from './CheckboxButton.styled'
import { Icon } from '@/components'
import { ChangeEventHandler } from 'react'

const CheckboxButton = ({
  id,
  title,
  text,
  iconName,
  checked,
  handleChange,
  style,
}: {
  id: string
  title: string
  text?: string
  iconName?: string
  checked: boolean
  handleChange: ChangeEventHandler<HTMLInputElement>
  style: CheckboxButtonStyled.Props
}) => {
  const darkMode = useDarkMode()

  return (
    <CheckboxButtonStyled.Component
      p={CheckboxButtonStyled.adapter(style, darkMode)}
    >
      <label htmlFor={id} />
      <input
        className="input"
        type="checkbox"
        id={id}
        title={title}
        checked={checked}
        onChange={handleChange}
      />
      <div className="fake-input">
        {text && <span className="text">{text}</span>}
        {iconName && <Icon iconName={iconName} />}
      </div>
    </CheckboxButtonStyled.Component>
  )
}

export default CheckboxButton
