import { OFFER_VIEW_KEYS, SECTION_KEYS } from '@/models'
import Section from '../Section/Section'

const Offers = () => {
  return (
    <Section
      sectionKey={SECTION_KEYS.offers}
      views={{
        [OFFER_VIEW_KEYS.view]: <div></div>,
      }}
    />
  )
}

export default Offers
