import { Sections } from '@/models'
import Section from '../Section/Section'

const Manufacturers = () => {
  return (
    <Section
      id={Sections.MANUFACTURERS.key}
      title={Sections.MANUFACTURERS.title}
      iconName={Sections.MANUFACTURERS.iconName}
      views={[
        {
          ...Sections.MANUFACTURERS.views.SEARCH,
          component: <div>SEARCH</div>,
        },
        {
          ...Sections.MANUFACTURERS.views.NEW,
          component: <div>NEW</div>,
        },
      ]}
    />
  )
}

export default Manufacturers
