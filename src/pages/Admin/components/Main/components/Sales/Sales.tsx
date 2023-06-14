import { SALE_VIEW_KEYS, SECTION_KEYS } from '@/models'
import Section from '../Section/Section'

const Sales = () => {
  return (
    <Section
      sectionKey={SECTION_KEYS.sales}
      views={{
        [SALE_VIEW_KEYS.view]: <div></div>,
      }}
    />
  )
}

export default Sales
