import {
  Field,
  PRODUCT_FIELD_KEYS,
  PRODUCT_VIEW_KEYS,
  SECTIONS,
  SECTION_KEYS,
  SingleField,
} from '@/models'
import { Search } from '../../..'
import { AppError, ERRORS, ERROR_MATCHER, cleanObject } from '@/tools'
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
  ItemProperties,
  ItemProperty,
  SelectorField,
} from '@/pages/Admin/components'
import { COLOR } from '@/styles'
import { useMemo } from 'react'
import { useGetInputError, useGetInputValue } from '@/pages/Admin/hooks'
import {
  ItemData,
  MessageType,
  enqueueMessage,
  loadItemInfo,
  setTextItem,
} from '@/redux'
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
    if (errorsExist(errors)) {
      dispatch(
        enqueueMessage({
          text: ERROR_MATCHER[ERRORS.client_fieldsErrors],
          type: MessageType.error,
        })
      )

      return false
    }

    console.log({ [fieldKey]: inputValue })

    const response = await ProductServices.edit(id, { [fieldKey]: inputValue })
    if (response instanceof AppError) return false

    dispatch(
      loadItemInfo({
        sectionKey: SECTION_KEYS.products,
        id,
        info: cleanObject(response),
      })
    )

    if (fieldKey === PRODUCT_FIELD_KEYS.name)
      dispatch(
        setTextItem({
          sectionKey: SECTION_KEYS.products,
          id,
          text: response.name as string,
        })
      )

    return true
  }

  return {
    propertyProps: {
      fieldData,
      key: fieldKey,
    },
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
    () => SECTIONS[SECTION_KEYS.products].fields?.[fieldKey] as Field,
    []
  )

  return { propertyProps: { fieldData, key: fieldKey } }
}

const Name = ({ id, itemData }: EditablePropertyProps) => {
  const { propertyProps, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.name,
  })

  const value = itemData.meta.text

  return (
    <ItemProperty
      {...propertyProps}
      value={value}
      editable={{
        field: <InputField {...fieldProps} />,
        edit,
      }}
    />
  )
}

const Category = ({ id, itemData }: EditablePropertyProps) => {
  const { propertyProps, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.category,
  })

  const value = (itemData.info as ProductModels.PrivateData)?.category?.text

  return (
    <ItemProperty
      {...propertyProps}
      value={value}
      editable={{
        field: <SelectorField loadOptions={categoryLoadOptions} {...fieldProps} />,
        edit,
      }}
    />
  )
}

const Manufacturer = ({ id, itemData }: EditablePropertyProps) => {
  const { propertyProps, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.manufacturer,
  })

  const value = (itemData.info as ProductModels.PrivateData)?.manufacturer?.text

  return (
    <ItemProperty
      {...propertyProps}
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
  const { propertyProps, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.description,
  })

  const value = (itemData.info as ProductModels.PrivateData)?.description

  return (
    <ItemProperty
      {...propertyProps}
      value={value}
      editable={{
        field: <InputField asTextArea {...fieldProps} />,
        edit,
      }}
    />
  )
}

const Stock = ({ id, itemData }: EditablePropertyProps) => {
  const { propertyProps, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.stock,
  })

  const value = (itemData.info as ProductModels.PrivateData)?.stock

  return (
    <ItemProperty
      {...propertyProps}
      value={value}
      editable={{
        field: <InputField {...fieldProps} />,
        edit,
      }}
    />
  )
}

const MinStock = ({ id, itemData }: EditablePropertyProps) => {
  const { propertyProps, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.minStock,
  })

  const value = (itemData.info as ProductModels.PrivateData)?.minStock

  return (
    <ItemProperty
      {...propertyProps}
      value={value}
      editable={{
        field: <InputField {...fieldProps} />,
        edit,
      }}
    />
  )
}

const Price = ({ id, itemData }: EditablePropertyProps) => {
  const { propertyProps, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.price,
  })

  const value = `$ ${(itemData.info as ProductModels.PrivateData)?.price}`

  return (
    <ItemProperty
      {...propertyProps}
      value={value}
      editable={{
        field: <InputField {...fieldProps} />,
        edit,
      }}
    />
  )
}

const Imported = ({ id, itemData }: EditablePropertyProps) => {
  const { propertyProps, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.imported,
  })

  const value = (itemData.info as ProductModels.PrivateData)?.imported ? 'Si' : 'No'

  return (
    <ItemProperty
      {...propertyProps}
      value={value}
      editable={{
        field: <CheckboxField {...fieldProps} />,
        edit,
      }}
    />
  )
}

const Discontinued = ({ id, itemData }: EditablePropertyProps) => {
  const { propertyProps, fieldProps, edit } = useEditableProperty({
    id,
    fieldKey: PRODUCT_FIELD_KEYS.discontinued,
  })

  const value = (itemData.info as ProductModels.PrivateData)?.discontinued
    ? 'Si'
    : 'No'

  return (
    <ItemProperty
      {...propertyProps}
      value={value}
      editable={{
        field: <CheckboxField {...fieldProps} />,
        edit,
      }}
    />
  )
}

const CreatedAt = ({ itemData }: PropertyProps) => {
  const { propertyProps } = useProperty({ fieldKey: PRODUCT_FIELD_KEYS.createdAt })

  const value = (itemData.info as ProductModels.PrivateData)?.createdAt

  return <ItemProperty {...propertyProps} value={value} />
}

const UpdatedAt = ({ itemData }: PropertyProps) => {
  const { propertyProps } = useProperty({ fieldKey: PRODUCT_FIELD_KEYS.updatedAt })

  const value = (itemData.info as ProductModels.PrivateData)?.updatedAt

  return <ItemProperty {...propertyProps} value={value} />
}

const CreatedByUser = ({ itemData }: PropertyProps) => {
  const { propertyProps } = useProperty({
    fieldKey: PRODUCT_FIELD_KEYS.createdByUser,
  })

  const value = (itemData.info as ProductModels.PrivateData)?.createdByUser.text

  return <ItemProperty {...propertyProps} value={value} />
}

const UpdatedByUser = ({ itemData }: PropertyProps) => {
  const { propertyProps } = useProperty({
    fieldKey: PRODUCT_FIELD_KEYS.updatedByUser,
  })

  const value = (itemData.info as ProductModels.PrivateData)?.updatedByUser?.text

  return <ItemProperty {...propertyProps} value={value} />
}

const Chars = ({ itemData }: PropertyProps) => {
  const { propertyProps } = useProperty({ fieldKey: PRODUCT_FIELD_KEYS.chars })

  const values: { key: string; value: string }[] = []

  const booleanChars = (
    itemData.info as ProductModels.PrivateData
  )?.booleanChars?.map(item => ({
    key: item.key,
    value: item.value ? 'Si' : 'No',
  }))

  const quantityChars = (
    itemData.info as ProductModels.PrivateData
  )?.quantityChars?.map(item => ({
    key: item.key,
    value: `${item.value} ${item.unit}`,
  }))

  const fractionChars = (
    itemData.info as ProductModels.PrivateData
  )?.fractionChars?.map(item => ({
    key: item.key,
    value: `${item.numeratorValue}/${item.denominatorValue} ${item.unit}`,
  }))

  const stringChars = (itemData.info as ProductModels.PrivateData)?.stringChars?.map(
    item => ({
      key: item.key,
      value: item.value,
    })
  )

  if (booleanChars) values.push(...booleanChars)
  if (quantityChars) values.push(...quantityChars)
  if (fractionChars) values.push(...fractionChars)
  if (stringChars) values.push(...stringChars)

  return <ItemProperties {...propertyProps} values={values} />
}

const loadItems: LoadItems = async (name: string) => {
  const products =
    name === ''
      ? await ProductServices.getAll()
      : await ProductServices.getByName(name)

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
      <Chars {...props} />
      <CreatedAt {...props} />
      <CreatedByUser {...props} />
      <UpdatedAt {...props} />
      <UpdatedByUser {...props} />
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
