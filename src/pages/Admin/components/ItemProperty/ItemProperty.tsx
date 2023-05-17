import { ConfirmationButton, Icon } from '@/components'
import { StylizedItemProperty, itemPropertyStyleAdapter } from './ItemProperty.styled'
import { useChildAdjustment, useDarkMode } from '@/hooks'
import FieldName from '../FieldName/FieldName'
import { css } from 'styled-components'
import { CheckboxButton } from '../Main/components/Search/components'

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
    <StylizedItemProperty p={itemPropertyStyleAdapter(darkMode)}>
      <FieldName title={name} />
      <div className="top">
        <div className="value">{value}</div>
        <CheckboxButton
          title="Editar"
          id="edit"
          style={{ backgroundColor: { dark: 'g-13', bright: 'g-1' } }}
        >
          <Icon iconName="fa-solid fa-pen" style={{ size: 'xs' }} />
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
            padding: 'xs',
            backgroundColor: { dark: 'g-13', bright: 'g-1' },
          }}
        >
          <Icon iconName="fa-solid fa-check" />
        </ConfirmationButton>
        {children}
      </div>
    </StylizedItemProperty>
  )
}

export default ItemProperty
