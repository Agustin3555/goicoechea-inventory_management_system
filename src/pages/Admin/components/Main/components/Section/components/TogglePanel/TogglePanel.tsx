import { Button, Icon } from '@/components'
import { useDarkMode } from '@/hooks'
import { FONT_SIZE } from '@/styles'
import { TogglePanelStyled } from './TogglePanel.styled'
import { css } from 'styled-components'
import { BRIGHT_2, DARK_2, MAIN_BORDER_RADIUS, MAIN_GAP } from '@/tools'

const TogglePanel = ({
  title,
  handleClick,
  iconName,
  text,
  invert = false,
}: {
  title: string
  handleClick: () => void
  iconName: string
  text: string
  invert?: boolean
}) => {
  const darkMode = useDarkMode()

  return (
    <TogglePanelStyled.Component p={TogglePanelStyled.adapter(darkMode)}>
      <Button
        handleClick={handleClick}
        title={title}
        style={{
          padding: MAIN_GAP,
          tight: true,
          borderRadius: MAIN_BORDER_RADIUS,
          backgroundColor: { dark: DARK_2, bright: BRIGHT_2 },
        }}
      >
        <div className="button-content">
          <Icon
            iconName={iconName}
            style={{
              size: FONT_SIZE.xs,
              styled: css`
                order: ${invert ? 1 : undefined};
              `,
            }}
          />
          {text}
        </div>
      </Button>
    </TogglePanelStyled.Component>
  )
}

export default TogglePanel
