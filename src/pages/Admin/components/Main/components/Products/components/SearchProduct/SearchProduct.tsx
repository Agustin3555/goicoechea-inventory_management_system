import {
  PRODUCT_FIELD_KEYS,
  PRODUCT_VIEW_KEYS,
  SECTIONS,
  SECTION_KEYS,
  SingleField,
} from '@/models'
import { Search } from '../../..'
import { AppError, ERRORS, ERROR_MATCHER } from '@/tools'
import { ProductServices } from '@/pages/Admin/services'
import {
  ResourceRef,
  buildAddress,
  categoryLoadOptions,
  errorsExist,
  manufacturerLoadOptions,
} from '@/pages/Admin/tools'
import {
  CheckboxField,
  InputField,
  ItemProperty,
  SelectorField,
} from '@/pages/Admin/components'
import { COLOR } from '@/styles'
import { useMemo } from 'react'
import { useGetInputError, useGetInputValue } from '@/pages/Admin/hooks'
import { ItemData, MessageType, enqueueMessage } from '@/redux'
import { useDispatch } from 'react-redux'
import { ProductModels } from '@/pages/Admin/models'
import { LoadItemData, LoadItems, LoadProperties } from '../../../Search/tools'

interface EditablePropertyProps {
  id: number
  itemData: ItemData
}

interface PropertyProps {
  itemData: ItemData
}

const useEditableProperty = ({ id, fieldKey }: { id: number; fieldKey: string }) => {
  const fieldData = useMemo(
    () => SECTIONS[SECTION_KEYS.products].fields?.[fieldKey] as SingleField,
    []
  )

  const storageAddress = useMemo(
    () =>
      buildAddress(
        SECTION_KEYS.products,
        PRODUCT_VIEW_KEYS.search,
        id,
        'edit',
        fieldKey
      ),
    []
  )

  const dispatch = useDispatch()
  const errors = useGetInputError({ storageAddress })
  const inputValue = useGetInputValue({ storageAddress })

  const edit = async () => {
    // if (errorsExist(errors)) {
    //   dispatch(
    //     enqueueMessage({
    //       text: ERROR_MATCHER[ERRORS.client_fieldsErrors],
    //       type: MessageType.error,
    //     })
    //   )

    //   return false
    // }

    // const response = await ProductServices.edit({ [fieldKey]: inputValue })

    // // TODO: response deberia de contener un objeto con todos los valores que han cambiado

    // /*
    //   response: {
    //     name: undefined,
    //     category: undefined,
    //     stock: 4,
    //     minStock: undefined,
    //     updatedAt: 'newValue',
    //     updatedByUser: {
    //       id: 1,
    //       text: 'Agustin Lovera'
    //     }
    //     ...
    //   }
    // */

    // if (response === true) {
    //   // TODO: aqui se deberia de llamar a setItemProperty() y cambiar cada property a su nuevo valor
    // }

    return false
  }

  return {
    fieldData,
    fieldProps: {
      fieldData,
      storageAddress,
      unlabeled: true,
      style: {
        mainColor: COLOR.b_b1,
      },
    },
    edit,
  }
}

const useProperty = ({ fieldKey }: { fieldKey: string }) => {
  const fieldData = useMemo(
    () => SECTIONS[SECTION_KEYS.products].fields?.[fieldKey] as SingleField,
    []
  )

  return { fieldData }
}

const Name = ({ id, itemData }: EditablePropertyProps) => {
  const { fieldData, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.name,
  })

  const value = itemData.meta.text

  return (
    <ItemProperty
      fieldData={fieldData}
      value={value}
      editable={{
        field: <InputField {...fieldProps} />,
        edit,
      }}
    />
  )
}

const Category = ({ id, itemData }: EditablePropertyProps) => {
  const { fieldData, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.category,
  })

  const value = (itemData.info as ProductModels.PrivateData).category?.text

  return (
    <ItemProperty
      fieldData={fieldData}
      value={value}
      editable={{
        field: <SelectorField loadOptions={categoryLoadOptions} {...fieldProps} />,
        edit,
      }}
    />
  )
}

const Manufacturer = ({ id, itemData }: EditablePropertyProps) => {
  const { fieldData, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.manufacturer,
  })

  const value = (itemData.info as ProductModels.PrivateData).manufacturer?.text

  return (
    <ItemProperty
      fieldData={fieldData}
      value={value}
      editable={{
        field: (
          <SelectorField loadOptions={manufacturerLoadOptions} {...fieldProps} />
        ),
        edit,
      }}
    />
  )
}

const Description = ({ id, itemData }: EditablePropertyProps) => {
  const { fieldData, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.description,
  })

  const value = (itemData.info as ProductModels.PrivateData).description

  return (
    <ItemProperty
      fieldData={fieldData}
      value={value}
      editable={{
        field: <InputField asTextArea {...fieldProps} />,
        edit,
      }}
    />
  )
}

const Stock = ({ id, itemData }: EditablePropertyProps) => {
  const { fieldData, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.stock,
  })

  const value = (itemData.info as ProductModels.PrivateData).stock

  return (
    <ItemProperty
      fieldData={fieldData}
      value={value}
      editable={{
        field: <InputField {...fieldProps} />,
        edit,
      }}
    />
  )
}

const MinStock = ({ id, itemData }: EditablePropertyProps) => {
  const { fieldData, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.minStock,
  })

  const value = (itemData.info as ProductModels.PrivateData).minStock

  return (
    <ItemProperty
      fieldData={fieldData}
      value={value}
      editable={{
        field: <InputField {...fieldProps} />,
        edit,
      }}
    />
  )
}

const Price = ({ id, itemData }: EditablePropertyProps) => {
  const { fieldData, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.price,
  })

  const value = (itemData.info as ProductModels.PrivateData).price

  return (
    <ItemProperty
      fieldData={fieldData}
      value={value}
      editable={{
        field: <InputField {...fieldProps} />,
        edit,
      }}
    />
  )
}

const Imported = ({ id, itemData }: EditablePropertyProps) => {
  const { fieldData, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.imported,
  })

  const value = (itemData.info as ProductModels.PrivateData).imported ? 'Si' : 'No'

  return (
    <ItemProperty
      fieldData={fieldData}
      value={value}
      editable={{
        field: <CheckboxField {...fieldProps} />,
        edit,
      }}
    />
  )
}

const Discontinued = ({ id, itemData }: EditablePropertyProps) => {
  const { fieldData, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.discontinued,
  })

  const value = (itemData.info as ProductModels.PrivateData).discontinued
    ? 'Si'
    : 'No'

  return (
    <ItemProperty
      fieldData={fieldData}
      value={value}
      editable={{
        field: <CheckboxField {...fieldProps} />,
        edit,
      }}
    />
  )
}

const CreatedAt = ({ itemData }: PropertyProps) => {
  const { fieldData } = useProperty({ fieldKey: PRODUCT_FIELD_KEYS.createdAt })

  const value = (itemData.info as ProductModels.PrivateData).createdAt

  return <ItemProperty fieldData={fieldData} value={value} />
}

const UpdatedAt = ({ itemData }: PropertyProps) => {
  const { fieldData } = useProperty({ fieldKey: PRODUCT_FIELD_KEYS.updatedAt })

  const value = (itemData.info as ProductModels.PrivateData).updatedAt

  return <ItemProperty fieldData={fieldData} value={value} />
}

const CreatedByUser = ({ itemData }: PropertyProps) => {
  const { fieldData } = useProperty({ fieldKey: PRODUCT_FIELD_KEYS.createdByUser })

  const value = (itemData.info as ProductModels.PrivateData).createdByUser.text

  return <ItemProperty fieldData={fieldData} value={value} />
}

const UpdatedByUser = ({ itemData }: PropertyProps) => {
  const { fieldData } = useProperty({ fieldKey: PRODUCT_FIELD_KEYS.updatedByUser })

  const value = (itemData.info as ProductModels.PrivateData).updatedByUser?.text

  return <ItemProperty fieldData={fieldData} value={value} />
}

const loadItems: LoadItems = async () => {
  const products = await ProductServices.getAll()

  if (!products || products instanceof AppError) return products as AppError

  return products.map<ResourceRef>(item => ({
    id: item.id,
    text: item.name,
  }))
}

const loadItemData: LoadItemData = async id => ProductServices.getOne(id)

const loadProperties: LoadProperties = (id, itemData) => {
  const props: EditablePropertyProps = { id, itemData }

  return (
    <>
      <Name {...props} />
      <Category {...props} />
      <Manufacturer {...props} />
      <Description {...props} />
      <Stock {...props} />
      <MinStock {...props} />
      <Price {...props} />
      <Imported {...props} />
      <Discontinued {...props} />
      {/* <CreatedAt {...props} />
      <UpdatedAt {...props} />
      <CreatedByUser {...props} />
      <UpdatedByUser {...props} /> */}
    </>
  )
}

const SearchProduct = () => {
  // TODO: TASK. Aqui se deberia de extraer el valor del buscador y pasarlo a getAll

  return (
    <Search
      sectionKey={SECTION_KEYS.products}
      loadItems={loadItems}
      loadItemData={loadItemData}
      loadProperties={loadProperties}
    />
  )
}

export default SearchProduct
