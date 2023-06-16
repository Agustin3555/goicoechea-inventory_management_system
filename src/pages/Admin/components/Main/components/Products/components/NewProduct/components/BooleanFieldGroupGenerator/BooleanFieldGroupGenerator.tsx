import { buildAddress } from '@/pages/Admin/tools'
import { BooleanFieldGroup } from '../../..'
import { useFieldGroupGenerator } from '../../hooks'
import {
  PRODUCT_BOOLEAN_CHARS_FIELD_KEYS,
  PRODUCT_FIELD_KEYS,
  PRODUCT_VIEW_KEYS,
  SECTION_KEYS,
} from '@/models'
import { Generator, GeneratorItem } from '@/pages/Admin/components'

const getFieldAddress = (index: number, fieldKey: string) =>
  buildAddress(
    SECTION_KEYS.products,
    PRODUCT_VIEW_KEYS.new,
    PRODUCT_FIELD_KEYS.booleanChars,
    index,
    fieldKey
  )

const getKeyFieldAddress = (index: number) =>
  getFieldAddress(index, PRODUCT_BOOLEAN_CHARS_FIELD_KEYS.key)

const getValueFieldAddress = (index: number) =>
  getFieldAddress(index, PRODUCT_BOOLEAN_CHARS_FIELD_KEYS.value)

const QuantityFieldGroupGenerator = () => {
  const { items, addButtonHandleClick, removeItem } = useFieldGroupGenerator({
    fieldGroupAddress: buildAddress(
      SECTION_KEYS.products,
      PRODUCT_VIEW_KEYS.new,
      PRODUCT_FIELD_KEYS.booleanChars
    ),
  })

  return (
    <Generator title="Características booleanas" handleAdd={addButtonHandleClick}>
      {items.map(index => (
        <GeneratorItem
          key={index}
          fieldGroup={
            <BooleanFieldGroup
              keyFieldAddress={getKeyFieldAddress(index)}
              valueFieldAddress={getValueFieldAddress(index)}
            />
          }
          handleRemove={() => removeItem(index)}
        />
      ))}
    </Generator>
  )
}

export default QuantityFieldGroupGenerator
