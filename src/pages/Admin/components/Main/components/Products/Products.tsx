import { PRODUCT_VIEW_KEYS, SECTION_KEYS } from '@/models'
import Section from '../Section/Section'
import { NewProduct, SearchProduct } from './components'

const Products = () => {
  return (
    <Section
      sectionKey={SECTION_KEYS.products}
      views={{
        [PRODUCT_VIEW_KEYS.search]: <SearchProduct />,
        [PRODUCT_VIEW_KEYS.new]: <NewProduct />,
      }}
    />
  )
}

export default Products
