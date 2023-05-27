import { SECTION_KEYS, VIEW_KEYS } from '@/models'
import Section from '../Section/Section'
import { NewProduct, SearchProduct } from './components'

const Products = () => {
  return (
    <Section
      sectionKey={SECTION_KEYS.products}
      views={{
        [VIEW_KEYS.search]: <SearchProduct />,
        [VIEW_KEYS.new]: <NewProduct />,
      }}
    />
  )
}

export default Products
