import { useDarkMode } from '@/hooks'
import { ButtonHTMLAttributes } from 'react'
import { ConfirmationButtonStyled } from './ConfirmationButton.styled'

const ConfirmationButton = ({
  title,
  trigger,
  style,
  extraAttrs,
  children,
}: {
  title: string
  trigger: () => void
  style: ConfirmationButtonStyled.Props
  extraAttrs?: ButtonHTMLAttributes<HTMLButtonElement>
  children: JSX.Element[] | JSX.Element
}) => {
  const darkMode = useDarkMode()

  let timerRef: NodeJS.Timeout

  const handleMouseDown = () => {
    timerRef = setTimeout(() => {
      trigger()
    }, 2000)
  }

  const handleMouseUp = () => {
    clearTimeout(timerRef)
  }

  return (
    <ConfirmationButtonStyled.Component
      p={ConfirmationButtonStyled.adapter(style, darkMode)}
      title={title}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...extraAttrs}
    >
      <div className="loader-container">
        <div className="loader" />
      </div>
      <div className="content">{children}</div>
    </ConfirmationButtonStyled.Component>
  )
}

export default ConfirmationButton
