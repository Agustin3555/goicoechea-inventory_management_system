import { Sections } from '@/models'
import Section from '../Section/Section'

const Me = () => {
  return (
    <Section
      id={Sections.ME.key}
      title={Sections.ME.title}
      iconName={Sections.ME.iconName}
      views={[
        {
          ...Sections.ME.views.SEARCH,
          component: <div>SEARCH</div>,
        },
        {
          ...Sections.ME.views.NEW,
          component: <div>NEW</div>,
        },
      ]}
    />
  )
}

export default Me
