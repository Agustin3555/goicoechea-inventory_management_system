import { Sections } from '@/models'
import Section from '../Section/Section'

const Offers = () => {
  return (
    <Section
      id={Sections.OFFERS.key}
      title={Sections.OFFERS.title}
      iconName={Sections.OFFERS.iconName}
      views={[
        {
          ...Sections.OFFERS.views.SEARCH,
          component: <div>SEARCH</div>,
        },
        {
          ...Sections.OFFERS.views.NEW,
          component: <div>NEW</div>,
        },
      ]}
    />
  )
}

export default Offers
