import { buildAddress } from '@/pages/Admin/tools'
import { QuantityFieldGroup } from '../../..'
import { useFieldGroupGenerator } from '../../hooks'
import {
  PRODUCT_FIELD_KEYS,
  PRODUCT_QUANTITY_CHARS_FIELD_KEYS,
  PRODUCT_VIEW_KEYS,
  SECTION_KEYS,
} from '@/models'
import { Generator, GeneratorItem } from '@/pages/Admin/components'

const getFieldAddress = (index: number, fieldKey: string) =>
  buildAddress(
    SECTION_KEYS.products,
    PRODUCT_VIEW_KEYS.new,
    PRODUCT_FIELD_KEYS.quantityChars,
    index,
    fieldKey
  )

const getKeyFieldAddress = (index: number) =>
  getFieldAddress(index, PRODUCT_QUANTITY_CHARS_FIELD_KEYS.key)

const getValueFieldAddress = (index: number) =>
  getFieldAddress(index, PRODUCT_QUANTITY_CHARS_FIELD_KEYS.value)

const getUnitFieldAddress = (index: number) =>
  getFieldAddress(index, PRODUCT_QUANTITY_CHARS_FIELD_KEYS.unit)

const QuantityFieldGroupGenerator = () => {
  const { items, addButtonHandleClick, clearField, removeItem } =
    useFieldGroupGenerator()

  return (
    <Generator title="Características por cantidad" handleAdd={addButtonHandleClick}>
      {items.map(index => (
        <GeneratorItem
          key={index}
          fieldGroup={
            <QuantityFieldGroup
              keyFieldAddress={getKeyFieldAddress(index)}
              valueFieldAddress={getValueFieldAddress(index)}
              unitFieldAddress={getUnitFieldAddress(index)}
            />
          }
          handleRemove={() => {
            clearField(getKeyFieldAddress(index))
            clearField(getValueFieldAddress(index))
            clearField(getUnitFieldAddress(index))

            removeItem(index)
          }}
        />
      ))}
    </Generator>
  )
}

export default QuantityFieldGroupGenerator
