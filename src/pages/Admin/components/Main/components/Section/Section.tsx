import { Icon } from '@/components'
import { useDarkMode } from '@/hooks'
import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { ToggleNav, ToggleRightPanel, ViewSelector } from './components'
import { sectionStyleAdapter, StylizedSection } from './Section.styled'

const Section = ({
  id,
  title,
  iconName,
  views,
}: {
  id: string
  title: string
  iconName: string
  views: {
    id: string
    title: string
    iconName: string
    component: JSX.Element[] | JSX.Element
  }[]
}) => {
  const darkMode = useDarkMode()
  const activeView = useSelector(
    (store: AppStore) => views.filter(view => view.id === store.activeViews[id])[0]
  )

  return (
    <StylizedSection p={sectionStyleAdapter(darkMode)}>
      <div className="head">
        <div className="toggle-container">
          <ToggleNav />
        </div>
        <div className="separator" />
        <div className="icon-container">
          <Icon iconName={iconName} style={{ size: 's' }} />
        </div>
        <h1 className="title">{title}</h1>
        <ViewSelector sectionId={id} views={views} />
        <div className="separator" />
        <div className="toggle-container">
          <ToggleRightPanel />
        </div>
      </div>
      <div className="separator" />
      <SwitchTransition>
        <CSSTransition
          key={activeView.id}
          classNames="fade"
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        >
          <div className="animation-container">{activeView.component}</div>
        </CSSTransition>
      </SwitchTransition>
    </StylizedSection>
  )
}

export default Section
