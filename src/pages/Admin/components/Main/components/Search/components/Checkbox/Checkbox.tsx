import { Icon } from '@/components'
import { useDarkMode } from '@/hooks'
import { checkboxStyleAdapter, CheckboxStyleProps, StylizedCheckbox } from './Checkbox.styled'

const Checkbox = ({
  id,
  title,
  style,
}: {
  id: string
  title: string
  style?: CheckboxStyleProps
}) => {
  const darkMode = useDarkMode()

  return (
    <StylizedCheckbox p={checkboxStyleAdapter(darkMode, style)}>
      <label htmlFor={id}></label>
      <input className="input" type="checkbox" id={id} title={title} />
      <div className="fake-input">
        <div className="checkbox">
          <div className="icon-container">
            <Icon iconName="fa-solid fa-check" />
          </div>
        </div>
        <span className="text">{title}</span>
      </div>
    </StylizedCheckbox>
  )
}

export default Checkbox
