import { CheckboxField, InputField, SelectorField } from '@/pages/Admin/components'
import { New } from '../../..'
import { AppError, ERRORS, ERROR_MATCHER, sleep } from '@/tools'
import {
  BooleanFieldGroupGenerator,
  FractionFieldGroupGenerator,
  QuantityFieldGroupGenerator,
  StringFieldGroupGenerator,
} from './components'
import {
  PRODUCT_FIELD_KEYS,
  PRODUCT_VIEW_KEYS,
  SECTIONS,
  SECTION_KEYS,
  SingleField,
} from '@/models'
import { buildAddress, errorsExist } from '@/pages/Admin/tools'
import {
  CategoryServices,
  ManufacturerServices,
  ProductServices,
} from '@/pages/Admin/services'
import { useGetInputError, useGetInputValue } from '@/pages/Admin/hooks'
import { useDispatch } from 'react-redux'
import { MessageType, enqueueMessage } from '@/redux'

const buildFieldAddress = (fieldKey: string) =>
  buildAddress(SECTION_KEYS.products, PRODUCT_VIEW_KEYS.new, fieldKey)

const FIELD_GROUP_ADDRESS = buildAddress(
  SECTION_KEYS.products,
  PRODUCT_VIEW_KEYS.new
)

const convertChars = (chars: {}) =>
  chars && Object.values(chars).filter(value => value !== undefined)

const NewProduct = () => {
  const dispatch = useDispatch()
  const errors = useGetInputError({ storageAddress: FIELD_GROUP_ADDRESS })
  const values = useGetInputValue({ storageAddress: FIELD_GROUP_ADDRESS })

  const handleSend = async () => {
    if (errorsExist(errors)) {
      dispatch(
        enqueueMessage({
          text: ERROR_MATCHER[ERRORS.client_fieldsErrors],
          type: MessageType.error,
        })
      )

      return false
    }

    // TODO: para un futuro, impedir que pueda crear sin establecer una conexiopn con el servidor

    const {
      name,
      category,
      manufacturer,
      description,
      stock,
      minStock,
      price,
      imported,
      discontinued,
    } = values as any

    const booleanChars = convertChars(values.booleanChars)
    const quantityChars = convertChars(values.quantityChars)
    const fractionChars = convertChars(values.fractionChars)
    const stringChars = convertChars(values.stringChars)

    const response = await ProductServices.create({
      name,
      category,
      manufacturer,
      description,
      stock,
      minStock,
      price,
      imported,
      discontinued,
      booleanChars,
      quantityChars,
      fractionChars,
      stringChars,
    })

    return response === true
  }

  const categoryLoadOptions = async () => {
    const categories = await CategoryServices.getAll()

    if (!categories || categories instanceof AppError) return categories as AppError

    return categories.map(item => ({
      id: item.id.toString(),
      title: item.name,
    }))
  }

  const manufacturerLoadOptions = async () => {
    const manufacturers = await ManufacturerServices.getAll()

    if (!manufacturers || manufacturers instanceof AppError)
      return manufacturers as AppError

    return manufacturers.map(item => ({
      id: item.id.toString(),
      title: item.name,
    }))
  }

  return (
    <New title="Nuevo Producto" handleSend={handleSend}>
      <InputField
        fieldData={
          SECTIONS[SECTION_KEYS.products].fields?.[
            PRODUCT_FIELD_KEYS.name
          ] as SingleField
        }
        storageAddress={buildFieldAddress(PRODUCT_FIELD_KEYS.name)}
      />
      <SelectorField
        loadOptions={categoryLoadOptions}
        fieldData={
          SECTIONS[SECTION_KEYS.products].fields?.[
            PRODUCT_FIELD_KEYS.category
          ] as SingleField
        }
        storageAddress={buildFieldAddress(PRODUCT_FIELD_KEYS.category)}
        optional
      />
      <SelectorField
        loadOptions={manufacturerLoadOptions}
        fieldData={
          SECTIONS[SECTION_KEYS.products].fields?.[
            PRODUCT_FIELD_KEYS.manufacturer
          ] as SingleField
        }
        storageAddress={buildFieldAddress(PRODUCT_FIELD_KEYS.manufacturer)}
        optional
      />
      <InputField
        fieldData={
          SECTIONS[SECTION_KEYS.products].fields?.[
            PRODUCT_FIELD_KEYS.description
          ] as SingleField
        }
        storageAddress={buildFieldAddress(PRODUCT_FIELD_KEYS.description)}
        asTextArea
        optional
      />
      <InputField
        fieldData={
          SECTIONS[SECTION_KEYS.products].fields?.[
            PRODUCT_FIELD_KEYS.stock
          ] as SingleField
        }
        storageAddress={buildFieldAddress(PRODUCT_FIELD_KEYS.stock)}
        optional
      />
      <InputField
        fieldData={
          SECTIONS[SECTION_KEYS.products].fields?.[
            PRODUCT_FIELD_KEYS.minStock
          ] as SingleField
        }
        storageAddress={buildFieldAddress(PRODUCT_FIELD_KEYS.minStock)}
        optional
      />
      <InputField
        fieldData={
          SECTIONS[SECTION_KEYS.products].fields?.[
            PRODUCT_FIELD_KEYS.price
          ] as SingleField
        }
        storageAddress={buildFieldAddress(PRODUCT_FIELD_KEYS.price)}
        optional
      />
      <CheckboxField
        fieldData={
          SECTIONS[SECTION_KEYS.products].fields?.[
            PRODUCT_FIELD_KEYS.imported
          ] as SingleField
        }
        storageAddress={buildFieldAddress(PRODUCT_FIELD_KEYS.imported)}
      />
      <BooleanFieldGroupGenerator />
      <QuantityFieldGroupGenerator />
      <FractionFieldGroupGenerator />
      <StringFieldGroupGenerator />
      <CheckboxField
        fieldData={
          SECTIONS[SECTION_KEYS.products].fields?.[
            PRODUCT_FIELD_KEYS.discontinued
          ] as SingleField
        }
        storageAddress={buildFieldAddress(PRODUCT_FIELD_KEYS.discontinued)}
      />
    </New>
  )
}

export default NewProduct
