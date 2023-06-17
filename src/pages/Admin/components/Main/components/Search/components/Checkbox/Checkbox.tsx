import { Icon } from '@/components'
import { useDarkMode } from '@/hooks'
import { CheckboxStyled } from './Checkbox.styled'
import { css } from 'styled-components'
import { FONT_SIZE, NOT_FONT_SIZE } from '@/styles'

const Checkbox = ({
  id,
  title,
  text,
  checked,
  handleChange,
  style,
}: {
  id: number | string
  title: string
  text: string
  checked?: boolean
  handleChange: () => void
  style?: CheckboxStyled.Props
}) => {
  const darkMode = useDarkMode()

  return (
    <CheckboxStyled.Component p={CheckboxStyled.adapter(darkMode, style)}>
      <label htmlFor={String(id)} />
      <input
        className="input"
        type="checkbox"
        id={String(id)}
        title={title}
        checked={checked}
        onChange={handleChange}
      />
      <div className="fake-input">
        <div className="box">
          <div className="icon-MC">
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
        <span className="text">{text}</span>
      </div>
    </CheckboxStyled.Component>
  )
}

export default Checkbox
