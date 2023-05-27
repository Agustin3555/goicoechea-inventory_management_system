import { Icon, Separator } from '@/components'
import { useDarkMode } from '@/hooks'
import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { ToggleNav, ToggleRightPanel, ViewSelector } from './components'
import { COLOR, FONT_SIZE, NOT_FONT_SIZE } from '@/styles'
import { SectionStyled } from './Section.styled'
import { css } from 'styled-components'
import { SECTIONS, SECTION_KEYS } from '@/models'

const Section = ({
  sectionKey,
  views,
}: {
  sectionKey: SECTION_KEYS
  views: { [key: string]: JSX.Element }
}) => {
  const darkMode = useDarkMode()
  const activeViewKey = useSelector((store: AppStore) => store.activeViews[sectionKey])
  const section = SECTIONS[sectionKey]

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
          <Icon iconName={section.iconName} style={{ size: FONT_SIZE.s }} />
        </div>
        <h1 className="title">{section.title}</h1>
        <ViewSelector sectionKey={sectionKey} />
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
          key={activeViewKey}
          classNames="fade"
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        >
          <div className="animation-container">{views[activeViewKey]}</div>
        </CSSTransition>
      </SwitchTransition>
    </SectionStyled.Component>
  )
}

export default Section
