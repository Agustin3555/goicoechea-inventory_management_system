import { Button, Icon } from '@/components'
import { COLOR } from '@/styles'
import { MAIN_BORDER_RADIUS, MAIN_GAP } from '@/tools'
import { css } from 'styled-components'

// TODO: cambiarlo por un ConfirmationButton

const ButtonRemove = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <Button
      title="Eliminar"
      handleClick={handleClick}
      extraAttrs={{ type: 'button' }}
      style={{
        tight: true,
        padding: MAIN_GAP,
        borderRadius: MAIN_BORDER_RADIUS,
        backgroundColor: { dark: COLOR.g_14, bright: COLOR.g_0 },
        styled: css`
          margin-top: calc(${MAIN_GAP} * 2);
          align-self: flex-start;
        `,
      }}
    >
      <Icon iconName="fa-solid fa-trash" />
    </Button>
  )
}

export default ButtonRemove
