import { ME_VIEW_KEYS, SECTION_KEYS } from '@/models'
import Section from '../Section/Section'

const Me = () => {
  return (
    <Section
      sectionKey={SECTION_KEYS.me}
      views={{
        [ME_VIEW_KEYS.profile]: <div>PROFILE</div>,
      }}
    />
  )
}

export default Me
