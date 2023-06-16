import { buildAddress } from '@/pages/Admin/tools'
import { StringFieldGroup } from '../../..'
import { useFieldGroupGenerator } from '../../hooks'
import {
  PRODUCT_FIELD_KEYS,
  PRODUCT_STRING_CHARS_FIELD_KEYS,
  PRODUCT_VIEW_KEYS,
  SECTION_KEYS,
} from '@/models'
import { Generator, GeneratorItem } from '@/pages/Admin/components'

const getFieldAddress = (index: number, fieldKey: string) =>
  buildAddress(
    SECTION_KEYS.products,
    PRODUCT_VIEW_KEYS.new,
    PRODUCT_FIELD_KEYS.stringChars,
    index,
    fieldKey
  )

const getKeyFieldAddress = (index: number) =>
  getFieldAddress(index, PRODUCT_STRING_CHARS_FIELD_KEYS.key)

const getValueFieldAddress = (index: number) =>
  getFieldAddress(index, PRODUCT_STRING_CHARS_FIELD_KEYS.value)

const StringFieldGroupGenerator = () => {
  const { items, addButtonHandleClick, removeItem } = useFieldGroupGenerator({
    fieldGroupAddress: buildAddress(
      SECTION_KEYS.products,
      PRODUCT_VIEW_KEYS.new,
      PRODUCT_FIELD_KEYS.stringChars
    ),
  })

  return (
    <Generator title="Características por texto" handleAdd={addButtonHandleClick}>
      {items.map(index => (
        <GeneratorItem
          key={index}
          fieldGroup={
            <StringFieldGroup
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

export default StringFieldGroupGenerator
