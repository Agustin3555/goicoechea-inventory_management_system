import { useDarkMode } from '@/hooks'
import { CheckboxButtonStyled } from './CheckboxButton.styled'

const CheckboxButton = ({
  id,
  title,
  style,
  children,
}: {
  id: string
  title: string
  style?: CheckboxButtonStyled.Props
  children: JSX.Element[] | JSX.Element
}) => {
  const darkMode = useDarkMode()

  return (
    <CheckboxButtonStyled.Component p={CheckboxButtonStyled.adapter(darkMode, style)}>
      <label htmlFor={id} />
      <input className="input" type="checkbox" id={id} title={title} />
      <div className="fake-input">{children}</div>
    </CheckboxButtonStyled.Component>
  )
}

export default CheckboxButton
