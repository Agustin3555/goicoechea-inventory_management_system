import { Sections } from '@/models'
import Section from '../Section/Section'

const Users = () => {
  return (
    <Section
      id={Sections.USERS.key}
      title={Sections.USERS.title}
      iconName={Sections.USERS.iconName}
      views={[
        {
          ...Sections.USERS.views.SEARCH,
          component: <div>SEARCH</div>,
        },
        {
          ...Sections.USERS.views.NEW,
          component: <div>NEW</div>,
        },
      ]}
    />
  )
}

export default Users
