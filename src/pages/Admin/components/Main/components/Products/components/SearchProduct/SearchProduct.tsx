import { PRODUCT_FIELD_KEYS, PRODUCT_VIEW_KEYS, SECTION_KEYS } from '@/models'
import { Search } from '../../..'
import { AppError } from '@/tools'
import { ProductServices } from '@/pages/Admin/services'
import { ResourceRef } from '@/pages/Admin/tools'
import { CheckboxField, InputEdit } from '@/pages/Admin/components'
import { COLOR } from '@/styles'

const fieldEditProps = {
  sectionKey: SECTION_KEYS.products,
  extraKeys: [PRODUCT_VIEW_KEYS.search, 'edit'],
}

const fieldProps = {
  ...fieldEditProps,
  unlabeled: true,
  style: {
    mainColor: COLOR.b,
  },
}

const SearchProduct = () => {
  const loadItems = async () => {
    const products = await ProductServices.getAll()

    if (!products || products instanceof AppError) return products as AppError

    return products.map<ResourceRef>(item => ({
      id: item.id,
      text: item.name,
    }))
  }

  return (
    <Search sectionKey={SECTION_KEYS.products} loadItems={loadItems}>
      <InputEdit />
      <InputEdit />
      <InputEdit />

      {/* <FieldEdit {...fieldEditProps}>
        <CheckboxField fieldKey={PRODUCT_FIELD_KEYS.imported} {...fieldProps} />
      </FieldEdit> */}
    </Search>
  )
}

export default SearchProduct
