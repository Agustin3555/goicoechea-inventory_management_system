import { SECTION_KEYS, VIEW_KEYS } from '@/models'
import Section from '../Section/Section'

const Offers = () => {
  return (
    <Section
      sectionKey={SECTION_KEYS.offers}
      views={{
        [VIEW_KEYS.search]: <div>SEARCH</div>,
        [VIEW_KEYS.new]: <div>NEW</div>,
      }}
    />
  )
}

export default Offers
