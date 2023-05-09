import { Button, Icon } from '@/components'
import { fontSizeAdapter } from '@/styles'
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
        padding: 'xs',
        borderRadius: '4xs',
        backgroundColor: { dark: 'g-14', bright: 'g-0' },
        styled: css`
          margin-top: calc(${fontSizeAdapter('xs')} * 2);
          align-self: flex-start;
        `,
      }}
    >
      <Icon iconName="fa-solid fa-trash" />
    </Button>
  )
}

export default ButtonRemove
