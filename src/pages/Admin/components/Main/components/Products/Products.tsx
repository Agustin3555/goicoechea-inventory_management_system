import { Sections } from '@/models'
import Section from '../Section/Section'

const Products = () => {
  return (
    <Section
      id={Sections.PRODUCTS.key}
      title={Sections.PRODUCTS.title}
      iconName={Sections.PRODUCTS.iconName}
      views={[
        {
          ...Sections.PRODUCTS.views.SEARCH,
          component: <div>SEARCH</div>,
        },
        {
          ...Sections.PRODUCTS.views.NEW,
          component: <div>NEW</div>,
        },
      ]}
    />
  )
}

export default Products
