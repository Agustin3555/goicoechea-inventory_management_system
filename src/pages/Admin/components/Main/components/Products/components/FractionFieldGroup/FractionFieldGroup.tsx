import { InputSelectorField } from '../../../../..'
import FieldGroup from '../FieldGroup/FieldGroup'
import { AppError } from '@/tools'
import { ProductServices } from '@/pages/Admin/services'
import { useGetInputValue } from '@/pages/Admin/hooks'
import {
  GroupField,
  PRODUCT_FIELD_KEYS,
  PRODUCT_FRACTION_CHARS_FIELD_KEYS,
  SECTIONS,
  SECTION_KEYS,
} from '@/models'

const FractionFieldGroup = ({
  keyFieldAddress,
  numeratorFieldAddress,
  denominatorFieldAddress,
  unitFieldAddress,
}: {
  keyFieldAddress: string
  numeratorFieldAddress: string
  denominatorFieldAddress: string
  unitFieldAddress: string
}) => {
  const keyFieldValue = useGetInputValue({ storageAddress: keyFieldAddress }) as
    | string
    | undefined

  const keyLoadOptions = async () => {
    const suggestions = await ProductServices.getFractionCharSuggestions({
      field: 'KEY',
    })

    if (!suggestions || suggestions instanceof AppError)
      return suggestions as AppError

    return suggestions.map(item => ({
      id: item as string,
      title: item as string,
    }))
  }

  const numeratorLoadOptions = async () => {
    const suggestions = await ProductServices.getFractionCharSuggestions({
      key: keyFieldValue as string | undefined,
      field: 'NUMERATOR_VALUE',
    })

    if (!suggestions || suggestions instanceof AppError)
      return suggestions as AppError

    return suggestions.map(item => ({
      id: item.toString(),
      title: item.toString(),
    }))
  }

  const denominatorLoadOptions = async () => {
    const suggestions = await ProductServices.getFractionCharSuggestions({
      key: keyFieldValue as string | undefined,
      field: 'DENOMINATOR_VALUE',
    })

    if (!suggestions || suggestions instanceof AppError)
      return suggestions as AppError

    return suggestions.map(item => ({
      id: item.toString(),
      title: item.toString(),
    }))
  }

  const unitLoadOptions = async () => {
    const suggestions = await ProductServices.getFractionCharSuggestions({
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
              PRODUCT_FIELD_KEYS.fractionChars
            ] as GroupField
          ).fields[PRODUCT_FRACTION_CHARS_FIELD_KEYS.key]
        }
        storageAddress={keyFieldAddress}
        loadOptions={keyLoadOptions}
      />
      <InputSelectorField
        fieldData={
          (
            SECTIONS[SECTION_KEYS.products].fields?.[
              PRODUCT_FIELD_KEYS.fractionChars
            ] as GroupField
          ).fields[PRODUCT_FRACTION_CHARS_FIELD_KEYS.numeratorValue]
        }
        storageAddress={numeratorFieldAddress}
        fieldDependency={[keyFieldAddress]}
        loadOptions={numeratorLoadOptions}
      />
      <InputSelectorField
        fieldData={
          (
            SECTIONS[SECTION_KEYS.products].fields?.[
              PRODUCT_FIELD_KEYS.fractionChars
            ] as GroupField
          ).fields[PRODUCT_FRACTION_CHARS_FIELD_KEYS.denominatorValue]
        }
        storageAddress={denominatorFieldAddress}
        fieldDependency={[keyFieldAddress]}
        loadOptions={denominatorLoadOptions}
      />
      <InputSelectorField
        fieldData={
          (
            SECTIONS[SECTION_KEYS.products].fields?.[
              PRODUCT_FIELD_KEYS.fractionChars
            ] as GroupField
          ).fields[PRODUCT_FRACTION_CHARS_FIELD_KEYS.unit]
        }
        storageAddress={unitFieldAddress}
        fieldDependency={[keyFieldAddress]}
        loadOptions={unitLoadOptions}
        optional
      />
    </FieldGroup>
  )
}

export default FractionFieldGroup
