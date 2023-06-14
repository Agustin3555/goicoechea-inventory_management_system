import { MANUFACTURER_VIEW_KEYS, SECTION_KEYS } from '@/models'
import Section from '../Section/Section'

const Manufacturers = () => {
  return (
    <Section
      sectionKey={SECTION_KEYS.manufacturers}
      views={{
        [MANUFACTURER_VIEW_KEYS.view]: <div></div>,
      }}
    />
  )
}

export default Manufacturers
