import { useDarkMode } from '@/hooks'
import { InputHTMLAttributes } from 'react'
import { inputStyleAdapter, StylizedInput, InputStyleProps } from './Input.styled'

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
  style?: InputStyleProps
}) => {
  const darkMode = useDarkMode()

  return (
    <StylizedInput
      style={{ gap: showLabel ? undefined : 0 }}
      p={inputStyleAdapter(darkMode, style)}
    >
      <label className="label" htmlFor={name}>
        {showLabel && title}
      </label>
      <input className="input" name={name} title={title} {...extraAttrs} />
    </StylizedInput>
  )
}

export default Input
