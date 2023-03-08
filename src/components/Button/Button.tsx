import { useDarkMode } from '@/hooks'
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'
import { buttonStyleAdapter, ButtonStyleProps, StylizedButton } from './Button.styled'

const Button = ({
  title,
  handleClick,
  style,
  extraAttrs,
  children,
}: {
  title: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
  style: ButtonStyleProps
  extraAttrs?: ButtonHTMLAttributes<HTMLButtonElement>
  children: JSX.Element[] | JSX.Element
}) => {
  const darkMode = useDarkMode()

  return (
    <StylizedButton
      p={buttonStyleAdapter(style, darkMode)}
      onClick={handleClick}
      title={title}
      {...extraAttrs}
    >
      {children}
    </StylizedButton>
  )
}

export default Button
