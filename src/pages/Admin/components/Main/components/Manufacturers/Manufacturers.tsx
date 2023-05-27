import { SECTION_KEYS, VIEW_KEYS } from '@/models'
import Section from '../Section/Section'

const Manufacturers = () => {
  return (
    <Section
      sectionKey={SECTION_KEYS.manufacturers}
      views={{
        [VIEW_KEYS.search]: <div>SEARCH</div>,
        [VIEW_KEYS.new]: <div>NEW</div>,
      }}
    />
  )
}

export default Manufacturers
