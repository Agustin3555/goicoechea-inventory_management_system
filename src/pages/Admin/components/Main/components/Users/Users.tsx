import { SECTION_KEYS, USER_VIEW_KEYS } from '@/models'
import Section from '../Section/Section'

const Users = () => {
  return (
    <Section
      sectionKey={SECTION_KEYS.users}
      views={{
        [USER_VIEW_KEYS.view]: <div></div>,
      }}
    />
  )
}

export default Users
