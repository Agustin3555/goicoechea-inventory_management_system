import { ConfirmationButton, Icon } from '@/components'
import { ItemPropertyStyled } from './ItemProperty.styled'
import { useChildAdjustment, useDarkMode } from '@/hooks'
import FieldName from '../FieldName/FieldName'
import { css } from 'styled-components'
import { CheckboxButton } from '../Main/components/Search/components'
import { COLOR, FONT_SIZE } from '@/styles'

const ItemProperty = ({
  name,
  value,
  children,
}: {
  name: string
  value: string
  children: JSX.Element | JSX.Element[]
}) => {
  const darkMode = useDarkMode()
  const { childRef, childHeight } = useChildAdjustment()

  return (
    <ItemPropertyStyled.Component p={ItemPropertyStyled.adapter(darkMode)}>
      <FieldName title={name} />
      <div className="top">
        <div className="value">{value}</div>
        <CheckboxButton
          title="Editar"
          id="edit"
          style={{ backgroundColor: { dark: COLOR.g_13, bright: COLOR.g_1 } }}
        >
          <Icon iconName="fa-solid fa-pen" style={{ size: FONT_SIZE.xs }} />
        </CheckboxButton>
      </div>
      <Icon
        iconName="fa-solid fa-arrow-up"
        style={{
          styled: css`
            align-self: center;
          `,
        }}
      />
      <div className="bottom">
        <ConfirmationButton
          title="Confirmar"
          trigger={() => {}}
          style={{
            padding: FONT_SIZE.xs,
            backgroundColor: { dark: COLOR.g_13, bright: COLOR.g_1 },
          }}
        >
          <Icon iconName="fa-solid fa-check" />
        </ConfirmationButton>
        {children}
      </div>
    </ItemPropertyStyled.Component>
  )
}

export default ItemProperty
