import { useDarkMode } from '@/hooks'
import { InputHTMLAttributes } from 'react'
import { InputStyled } from './Input.styled'

const Input = ({
  name,
  title,
  showLabel = true,
  extraAttrs,
  style,
}: {
  name: string
  title: string
  showLabel?: boolean
  extraAttrs?: InputHTMLAttributes<HTMLInputElement>
  style?: InputStyled.Props
}) => {
  const darkMode = useDarkMode()

  return (
    <InputStyled.Component
      style={{ gap: showLabel ? undefined : 0 }}
      p={InputStyled.adapter(darkMode, style)}
    >
      <label className="label" htmlFor={name}>
        {showLabel && title}
      </label>
      <input className="input" name={name} title={title} {...extraAttrs} />
    </InputStyled.Component>
  )
}

export default Input
