import { CheckboxField, InputSelectorField } from '../../../../..'
import FieldGroup from '../FieldGroup/FieldGroup'
import { AppError } from '@/tools'
import { ProductServices } from '@/pages/Admin/services'
import {
  GroupField,
  PRODUCT_BOOLEAN_CHARS_FIELD_KEYS,
  PRODUCT_FIELD_KEYS,
  SECTIONS,
  SECTION_KEYS,
} from '@/models'

const BooleanFieldGroup = ({
  keyFieldAddress,
  valueFieldAddress,
}: {
  keyFieldAddress: string
  valueFieldAddress: string
}) => {
  const keyLoadOptions = async () => {
    const suggestions = await ProductServices.getBooleanCharSuggestions({
      field: 'KEY',
    })

    if (!suggestions || suggestions instanceof AppError)
      return suggestions as AppError

    return suggestions.map(item => ({
      id: item as string,
      title: item as string,
    }))
  }

  return (
    <FieldGroup>
      <InputSelectorField
        fieldData={
          (
            SECTIONS[SECTION_KEYS.products].fields?.[
              PRODUCT_FIELD_KEYS.booleanChars
            ] as GroupField
          ).fields[PRODUCT_BOOLEAN_CHARS_FIELD_KEYS.key]
        }
        storageAddress={keyFieldAddress}
        loadOptions={keyLoadOptions}
      />
      <CheckboxField
        fieldData={
          (
            SECTIONS[SECTION_KEYS.products].fields?.[
              PRODUCT_FIELD_KEYS.booleanChars
            ] as GroupField
          ).fields[PRODUCT_BOOLEAN_CHARS_FIELD_KEYS.value]
        }
        storageAddress={valueFieldAddress}
      />
    </FieldGroup>
  )
}

export default BooleanFieldGroup
