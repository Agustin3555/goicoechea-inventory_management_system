import { Sections } from '@/models'
import Section from '../Section/Section'

const Categories = () => {
  return (
    <Section
      id={Sections.CATEGORIES.key}
      title={Sections.CATEGORIES.title}
      iconName={Sections.CATEGORIES.iconName}
      views={[
        {
          ...Sections.CATEGORIES.views.SEARCH,
          component: <div>SEARCH</div>,
        },
        {
          ...Sections.CATEGORIES.views.NEW,
          component: <div>NEW</div>,
        },
      ]}
    />
  )
}

export default Categories
