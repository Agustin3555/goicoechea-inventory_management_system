import { Sections } from '@/models'
import Section from '../Section/Section'

const Sales = () => {
  return (
    <Section
      id={Sections.SALES.key}
      title={Sections.SALES.title}
      iconName={Sections.SALES.iconName}
      views={[
        {
          ...Sections.SALES.views.SEARCH,
          component: <div>SEARCH</div>,
        },
        {
          ...Sections.SALES.views.NEW,
          component: <div>NEW</div>,
        },
      ]}
    />
  )
}

export default Sales
