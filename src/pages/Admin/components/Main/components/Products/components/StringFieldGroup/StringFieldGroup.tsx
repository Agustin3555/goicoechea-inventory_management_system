import { InputSelectorField } from '../../../../..'
import FieldGroup from '../FieldGroup/FieldGroup'
import { AppError } from '@/tools'
import { ProductServices } from '@/pages/Admin/services'
import { useGetInputValue } from '@/pages/Admin/hooks'
import {
  GroupField,
  PRODUCT_FIELD_KEYS,
  PRODUCT_STRING_CHARS_FIELD_KEYS,
  SECTIONS,
  SECTION_KEYS,
} from '@/models'

const StringFieldGroup = ({
  keyFieldAddress,
  valueFieldAddress,
}: {
  keyFieldAddress: string
  valueFieldAddress: string
}) => {
  const keyFieldValue = useGetInputValue({ storageAddress: keyFieldAddress }) as
    | string
    | undefined

  const keyLoadOptions = async () => {
    const suggestions = await ProductServices.getStringCharSuggestions({
      field: 'KEY',
    })

    if (!suggestions || suggestions instanceof AppError)
      return suggestions as AppError

    return suggestions.map(item => ({
      id: item as string,
      title: item as string,
    }))
  }

  const valueLoadOptions = async () => {
    const suggestions = await ProductServices.getStringCharSuggestions({
      key: keyFieldValue as string | undefined,
      field: 'VALUE',
    })

    if (!suggestions || suggestions instanceof AppError)
      return suggestions as AppError

    return suggestions.map(item => ({
      id: item.toString(),
      title: item.toString(),
    }))
  }

  return (
    <FieldGroup>
      <InputSelectorField
        fieldData={
          (
            SECTIONS[SECTION_KEYS.products].fields?.[
              PRODUCT_FIELD_KEYS.stringChars
            ] as GroupField
          ).fields[PRODUCT_STRING_CHARS_FIELD_KEYS.key]
        }
        storageAddress={keyFieldAddress}
        loadOptions={keyLoadOptions}
      />
      <InputSelectorField
        fieldData={
          (
            SECTIONS[SECTION_KEYS.products].fields?.[
              PRODUCT_FIELD_KEYS.stringChars
            ] as GroupField
          ).fields[PRODUCT_STRING_CHARS_FIELD_KEYS.value]
        }
        storageAddress={valueFieldAddress}
        fieldDependency={[keyFieldAddress]}
        loadOptions={valueLoadOptions}
      />
    </FieldGroup>
  )
}

export default StringFieldGroup
