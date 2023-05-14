import { Sections } from '@/models'
import Section from '../Section/Section'
import { NewProduct, SearchProduct } from './components'

const sectionKey = Sections.PRODUCTS.key

const Products = () => {
  return (
    <Section
      id={sectionKey}
      title={Sections.PRODUCTS.title}
      iconName={Sections.PRODUCTS.iconName}
      views={[
        {
          ...Sections.PRODUCTS.views.SEARCH,
          component: <SearchProduct />,
        },
        {
          ...Sections.PRODUCTS.views.NEW,
          component: <NewProduct />,
        },
      ]}
    />
  )
}

export default Products
