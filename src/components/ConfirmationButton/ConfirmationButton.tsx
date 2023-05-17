import { useDarkMode } from '@/hooks'
import { ButtonHTMLAttributes, MouseEventHandler, useRef, useState } from 'react'
import {
  confirmationButtonStyleAdapter,
  ConfirmationButtonStyleProps,
  StylizedConfirmationButton,
} from './ConfirmationButton.styled'

const ConfirmationButton = ({
  title,
  trigger,
  style,
  extraAttrs,
  children,
}: {
  title: string
  trigger: () => void
  style: ConfirmationButtonStyleProps
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
    <StylizedConfirmationButton
      p={confirmationButtonStyleAdapter(style, darkMode)}
      title={title}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...extraAttrs}
    >
      <div className="loader-container">
        <div className="loader" />
      </div>
      <div className="content">{children}</div>
    </StylizedConfirmationButton>
  )
}

export default ConfirmationButton
