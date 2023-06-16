import { useChildAdjustment, useDarkMode } from '@/hooks'
import { ButtonHTMLAttributes, useEffect, useState } from 'react'
import { ConfirmationButtonStyled } from './ConfirmationButton.styled'
import Spinner from '../Spinner/Spinner'
import AnimateState from '../AnimateState/AnimateState'
import { sleep } from '@/tools'
import Icon from '../Icon/Icon'

export enum STATUS {
  init,
  loading,
  success,
  error,
}

const ConfirmationButton = ({
  title,
  text,
  iconName,
  trigger,
  style,
  extraAttrs,
}: {
  title: string
  text?: string
  iconName?: string
  trigger: () => Promise<boolean>
  style: ConfirmationButtonStyled.Props
  extraAttrs?: ButtonHTMLAttributes<HTMLButtonElement>
}) => {
  const darkMode = useDarkMode()
  const [status, setStatus] = useState<STATUS>(STATUS.init)
  const { childRef, childWidth } = useChildAdjustment()
  const [contentWidth, setContentWidth] = useState(0)

  useEffect(() => {
    if (childWidth !== 0 && childWidth !== contentWidth) setContentWidth(childWidth)
  }, [childWidth])

  let timerRef: NodeJS.Timeout

  const handleMouseDown = () => {
    timerRef = setTimeout(async () => {
      setStatus(STATUS.loading)

      await sleep(1000)

      setStatus((await trigger()) ? STATUS.success : STATUS.error)

      await sleep(2000)

      setStatus(STATUS.init)
    }, 2000)
  }

  const handleMouseUp = () => {
    clearTimeout(timerRef)
  }

  const componentsByStatus = {
    [STATUS.init]: (
      <>
        {iconName && <Icon iconName={iconName} style={{ size: style.fontSize }} />}
        {text && <span className="text">{text}</span>}
      </>
    ),
    [STATUS.loading]: <Spinner />,
    [STATUS.success]: (
      <Icon iconName="fa-solid fa-check" style={{ size: style.fontSize }} />
    ),
    [STATUS.error]: (
      <Icon iconName="fa-solid fa-xmark" style={{ size: style.fontSize }} />
    ),
  }

  return (
    <ConfirmationButtonStyled.Component
      p={ConfirmationButtonStyled.adapter(style, darkMode, status)}
      title={title}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      disabled={status !== STATUS.init}
      {...extraAttrs}
    >
      <div className="loader-C">
        <div className="loader" />
      </div>
      <AnimateState state={String(status)}>
        <div
          className="confirmation-button-AC"
          ref={childRef}
          style={{ width: contentWidth }}
        >
          {componentsByStatus[status]}
        </div>
      </AnimateState>
    </ConfirmationButtonStyled.Component>
  )
}

export default ConfirmationButton
