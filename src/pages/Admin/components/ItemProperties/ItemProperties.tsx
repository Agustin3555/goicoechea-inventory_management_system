import { ItemPropertiesStyled } from './ItemProperties.styled'
import { useDarkMode } from '@/hooks'
import { useMemo } from 'react'
import { Field } from '@/models'

const ItemProperty = ({
  fieldData,
  values,
}: {
  fieldData: Field
  values?: { key: string; value: string }[]
}) => {
  const darkMode = useDarkMode()
  const { title } = useMemo(() => fieldData, [])

  return (
    <ItemPropertiesStyled.Component p={ItemPropertiesStyled.adapter(darkMode)}>
      <div className="title">{title}</div>
      <div className="item-properties-items">
        {values && values.length !== 0
          ? values.map(item => (
              <div className="item">
                <span className="key">{item.key}:</span>
                <span>{item.value}</span>
              </div>
            ))
          : '~'}
      </div>
    </ItemPropertiesStyled.Component>
  )
}

export default ItemProperty
