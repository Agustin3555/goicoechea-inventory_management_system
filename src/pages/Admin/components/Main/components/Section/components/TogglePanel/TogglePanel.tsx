import { Button, Icon } from '@/components'
import { useDarkMode } from '@/hooks'
import { MouseEventHandler } from 'react'
import { StylizedTogglePanel, togglePanelAdapter } from './TogglePanel.styled'

const TogglePanel = ({
  title,
  handleClick,
  iconName,
  text,
  invert = false,
}: {
  title: string
  handleClick: MouseEventHandler<HTMLButtonElement>
  iconName: string
  text: string
  invert?: boolean
}) => {
  const darkMode = useDarkMode()

  return (
    <StylizedTogglePanel p={togglePanelAdapter(darkMode)}>
      <Button
        handleClick={handleClick}
        title={title}
        style={{
          padding: 'xs',
          tight: true,
          borderRadius: '4xs',
          backgroundColor: { dark: 'g-14', bright: 'g-0' },
        }}
      >
        <div className="button-content">
          <div className="icon-container" style={{ order: invert ? 1 : undefined }}>
            <Icon iconName={iconName} style={{ size: 'xs' }} />
          </div>
          <span className="text">{text}</span>
        </div>
      </Button>
    </StylizedTogglePanel>
  )
}

export default TogglePanel
