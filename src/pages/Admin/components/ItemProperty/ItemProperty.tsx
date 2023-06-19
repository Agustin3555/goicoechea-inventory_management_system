import { ConfirmationButton, Icon } from '@/components'
import { ItemPropertyStyled } from './ItemProperty.styled'
import { useChildAdjustment, useDarkMode } from '@/hooks'
import { css } from 'styled-components'
import { CheckboxButton } from '../Main/components/Search/components'
import { COLOR, FONT_SIZE } from '@/styles'
import { useMemo } from 'react'
import { SingleField } from '@/models'

const ItemProperty = ({
  fieldData,
  value,
  editable,
}: {
  fieldData: SingleField
  value?: number | string | null
  editable?: {
    field: JSX.Element
    edit: () => Promise<boolean>
  }
}) => {
  const darkMode = useDarkMode()
  const { childRef, childHeight } = useChildAdjustment()

  const { title } = useMemo(() => {
    const { title } = fieldData

    return { title }
  }, [])

  // TODO: Hacer bien el renderizado condicional

  return (
    <ItemPropertyStyled.Component p={ItemPropertyStyled.adapter(darkMode)}>
      {title}
      {editable ? (
        <>
          <div className="top">
            <div className="value">
              {value === undefined || value === null ? '~' : value}
            </div>
            <CheckboxButton title="Editar" id="edit">
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
            {editable.field}
            <ConfirmationButton
              title="Confirmar"
              iconName="fa-solid fa-check"
              trigger={editable.edit}
              style={{
                secondaryBackgroundColor: COLOR.b_b1,
              }}
            />
          </div>
        </>
      ) : (
        <div className="value">
          {value === undefined || value === null ? '~' : value}
        </div>
      )}
    </ItemPropertyStyled.Component>
  )
}

export default ItemProperty
