import { ConfirmationButton } from '@/components'
import { ItemPropertyStyled } from './ItemProperty.styled'
import { useDarkMode } from '@/hooks'
import { css } from 'styled-components'
import { CheckboxButton } from '../Main/components/Search/components'
import { COLOR } from '@/styles'
import { ChangeEventHandler, useMemo, useState } from 'react'
import { Field } from '@/models'

const ItemProperty = ({
  fieldData,
  value,
  editable,
}: {
  fieldData: Field
  value?: number | string | null
  editable?: {
    field: JSX.Element
    edit: () => Promise<boolean>
  }
}) => {
  const darkMode = useDarkMode()
  const [editing, setEditing] = useState(false)
  const { title } = useMemo(() => fieldData, [])

  const handleEditButtonChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { checked } = event.target

    setEditing(checked)
  }

  return (
    <ItemPropertyStyled.Component p={ItemPropertyStyled.adapter(darkMode, editing)}>
      <div className="title">{title}</div>
      <div className="top">
        <div className="value">
          {value === undefined || value === null ? '~' : value}
        </div>
        {editable && (
          <div className="edit-button-MC">
            <CheckboxButton
              title="Editar"
              iconName="fa-solid fa-pen"
              id="edit"
              checked={editing}
              style={{ secondaryBackgroundColor: COLOR.b_b1 }}
              handleChange={handleEditButtonChange}
            />
          </div>
        )}
      </div>
      {editable && (
        <div className="bottom">
          {editable.field}
          <ConfirmationButton
            title="Confirmar"
            iconName="fa-solid fa-check"
            trigger={editable.edit}
            style={{
              secondaryBackgroundColor: COLOR.b_b1,
              styled: css`
                align-self: start;
              `,
            }}
          />
        </div>
      )}
    </ItemPropertyStyled.Component>
  )
}

export default ItemProperty
