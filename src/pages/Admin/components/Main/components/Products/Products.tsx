import { Sections } from '@/models'
import Search from '../Search/Search'
import Section from '../Section/Section'
import { NewProduct } from './components'

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
          component: <Search />,
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
