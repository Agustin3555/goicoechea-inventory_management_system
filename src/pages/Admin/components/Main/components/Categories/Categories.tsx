import { CATEGORY_VIEW_KEYS, SECTION_KEYS } from '@/models'
import Section from '../Section/Section'

const Categories = () => {
  return (
    <Section
      sectionKey={SECTION_KEYS.categories}
      views={{
        [CATEGORY_VIEW_KEYS.view]: <div></div>,
      }}
    />
  )
}

export default Categories
