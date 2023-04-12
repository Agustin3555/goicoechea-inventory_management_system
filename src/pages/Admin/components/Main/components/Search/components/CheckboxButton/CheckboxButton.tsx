import { useDarkMode } from '@/hooks'
import {
  checkboxButtonStyleAdapter,
  CheckboxButtonStyleProps,
  StylizedCheckboxButton,
} from './CheckboxButton.styled'

const CheckboxButton = ({
  id,
  title,
  style,
  children,
}: {
  id: string
  title: string
  style?: CheckboxButtonStyleProps
  children: JSX.Element[] | JSX.Element
}) => {
  const darkMode = useDarkMode()

  return (
    <StylizedCheckboxButton p={checkboxButtonStyleAdapter(darkMode, style)}>
      <label htmlFor={id}></label>
      <input className="input" type="checkbox" id={id} title={title} />
      <div className="fake-input">{children}</div>
    </StylizedCheckboxButton>
  )
}

export default CheckboxButton
