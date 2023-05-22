import { Button, Icon } from '@/components'
import { COLOR, FONT_SIZE, NOT_FONT_SIZE } from '@/styles'
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
        padding: FONT_SIZE.xs,
        borderRadius: NOT_FONT_SIZE['4xs'],
        backgroundColor: { dark: COLOR.g_14, bright: COLOR.g_0 },
        styled: css`
          margin-top: calc(${FONT_SIZE.xs} * 2);
          align-self: flex-start;
        `,
      }}
    >
      <Icon iconName="fa-solid fa-trash" />
    </Button>
  )
}

export default ButtonRemove
