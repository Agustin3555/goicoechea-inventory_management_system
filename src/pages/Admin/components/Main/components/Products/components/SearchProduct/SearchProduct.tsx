import { Sections } from '@/models'
import { Search } from '../../..'
import { AppError } from '@/tools'
import { ProductServices } from '@/pages/Admin/services'
import { ResourceRef } from '@/pages/Admin/tools'
import { InputEdit } from '@/pages/Admin/components'

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
    <Search sectionKey={Sections.PRODUCTS.key} loadItems={loadItems}>
      <InputEdit />
      <InputEdit />
      <InputEdit />
    </Search>
  )
}

export default SearchProduct
