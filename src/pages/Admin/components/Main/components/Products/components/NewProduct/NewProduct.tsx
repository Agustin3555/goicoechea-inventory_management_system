import { CheckboxField, InputField, SelectorField } from '@/pages/Admin/components'
import { New } from '../../..'
import { AppError } from '@/tools'
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
import { buildAddress } from '@/pages/Admin/tools'
import { CategoryServices, ManufacturerServices } from '@/pages/Admin/services'

const buildFieldAddress = (fieldKey: string) =>
  buildAddress(SECTION_KEYS.products, PRODUCT_VIEW_KEYS.new, fieldKey)

const NewProduct = () => {
  const handleSend = async () => {
    // TODO: TASK
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

  // TODO: TASK. no se esta llamando a valores unicos en la API, hay que empatar los valores iguales en la consulta a la BD

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
