import { Icon, Separator } from '@/components'
import { useDarkMode } from '@/hooks'
import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { ToggleNav, ToggleRightPanel, ViewSelector } from './components'
import { COLOR, FONT_SIZE, NOT_FONT_SIZE } from '@/styles'
import { SectionStyled } from './Section.styled'
import { css } from 'styled-components'

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
    <SectionStyled.Component p={SectionStyled.adapter(darkMode)}>
      <div className="head">
        <ToggleNav />
        <div className="separator-container">
          <Separator
            style={{ long: NOT_FONT_SIZE.xs, backgroundColor: { dark: COLOR.g_8 } }}
          />
        </div>
        <div className="icon-container">
          <Icon iconName={iconName} style={{ size: FONT_SIZE.s }} />
        </div>
        <h1 className="title">{title}</h1>
        <ViewSelector sectionKey={id} views={views} />
        <div className="separator-container">
          <Separator
            style={{ long: NOT_FONT_SIZE.xs, backgroundColor: { dark: COLOR.g_8 } }}
          />
        </div>
        <ToggleRightPanel />
      </div>
      <Separator
        style={{
          invert: true,
          backgroundColor: { dark: COLOR.g_8 },
          styled: css`
            /* TODO: solo asi se puede ver, despues de que se carguen los items */
            flex-grow: 1;
            flex-shrink: 0;
          `,
        }}
      />
      <SwitchTransition>
        <CSSTransition
          key={activeView.id}
          classNames="fade"
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        >
          <div className="animation-container">{activeView.component}</div>
        </CSSTransition>
      </SwitchTransition>
    </SectionStyled.Component>
  )
}

export default Section
