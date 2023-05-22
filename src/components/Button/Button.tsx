import { useDarkMode } from '@/hooks'
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'
import { ButtonStyled } from './Button.styled'

const Button = ({
  title,
  handleClick,
  style,
  extraAttrs,
  children,
}: {
  title: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
  style: ButtonStyled.Props
  extraAttrs?: ButtonHTMLAttributes<HTMLButtonElement>
  children: JSX.Element[] | JSX.Element
}) => {
  const darkMode = useDarkMode()

  return (
    <ButtonStyled.Component
      p={ButtonStyled.adapter(style, darkMode)}
      onClick={handleClick}
      title={title}
      {...extraAttrs}
    >
      {children}
    </ButtonStyled.Component>
  )
}

export default Button
