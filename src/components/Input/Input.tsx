import { useDarkMode } from '@/hooks'
import { ChangeEventHandler, InputHTMLAttributes } from 'react'
import { inputStyleAdapter, StylizedInput, InputStyleProps } from './Input.styled'

const Input = ({
  name,
  title,
  extraAttrs,
  style,
}: {
  name: string
  title: string
  extraAttrs?: InputHTMLAttributes<HTMLInputElement>
  style?: InputStyleProps
}) => {
  const darkMode = useDarkMode()

  return (
    <StylizedInput p={inputStyleAdapter(darkMode, style)}>
      <label className="label" htmlFor={name}>
        {title}
      </label>
      <input className="input" name={name} title={title} {...extraAttrs} />
    </StylizedInput>
  )
}

export default Input
