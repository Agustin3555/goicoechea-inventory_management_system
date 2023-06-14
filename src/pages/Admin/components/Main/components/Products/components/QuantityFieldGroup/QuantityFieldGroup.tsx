import { InputSelectorField } from '../../../../..'
import FieldGroup from '../FieldGroup/FieldGroup'
import { AppError } from '@/tools'
import { ProductServices } from '@/pages/Admin/services'
import { useGetInputValue } from '@/pages/Admin/hooks'
import {
  GroupField,
  PRODUCT_FIELD_KEYS,
  PRODUCT_QUANTITY_CHARS_FIELD_KEYS,
  SECTIONS,
  SECTION_KEYS,
} from '@/models'

const QuantityFieldGroup = ({
  keyFieldAddress,
  valueFieldAddress,
  unitFieldAddress,
}: {
  keyFieldAddress: string
  valueFieldAddress: string
  unitFieldAddress: string
}) => {
  const keyFieldValue = useGetInputValue({ storageAddress: keyFieldAddress }) as
    | string
    | undefined

  const keyLoadOptions = async () => {
    const suggestions = await ProductServices.getQuantityCharSuggestions({
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
    const suggestions = await ProductServices.getQuantityCharSuggestions({
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

  const unitLoadOptions = async () => {
    const suggestions = await ProductServices.getQuantityCharSuggestions({
      key: keyFieldValue,
      field: 'METRIC_UNIT',
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
              PRODUCT_FIELD_KEYS.quantityChars
            ] as GroupField
          ).fields[PRODUCT_QUANTITY_CHARS_FIELD_KEYS.key]
        }
        storageAddress={keyFieldAddress}
        loadOptions={keyLoadOptions}
      />
      <InputSelectorField
        fieldData={
          (
            SECTIONS[SECTION_KEYS.products].fields?.[
              PRODUCT_FIELD_KEYS.quantityChars
            ] as GroupField
          ).fields[PRODUCT_QUANTITY_CHARS_FIELD_KEYS.value]
        }
        storageAddress={valueFieldAddress}
        fieldDependency={[keyFieldAddress]}
        loadOptions={valueLoadOptions}
      />
      <InputSelectorField
        fieldData={
          (
            SECTIONS[SECTION_KEYS.products].fields?.[
              PRODUCT_FIELD_KEYS.quantityChars
            ] as GroupField
          ).fields[PRODUCT_QUANTITY_CHARS_FIELD_KEYS.unit]
        }
        storageAddress={unitFieldAddress}
        fieldDependency={[keyFieldAddress]}
        loadOptions={unitLoadOptions}
        optional
      />
    </FieldGroup>
  )
}

export default QuantityFieldGroup
