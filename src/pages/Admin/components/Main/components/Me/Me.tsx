import { SECTION_KEYS, VIEW_KEYS } from '@/models'
import Section from '../Section/Section'

const Me = () => {
  return (
    <Section
      sectionKey={SECTION_KEYS.me}
      views={{
        [VIEW_KEYS.profile]: <div>PROFILE</div>,
      }}
    />
  )
}

export default Me
