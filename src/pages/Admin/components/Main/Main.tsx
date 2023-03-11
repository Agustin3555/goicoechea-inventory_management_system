import { useDarkMode } from '@/hooks'
import { Sections } from '@/models'
import { AppStore } from '@/redux/store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Section } from './components'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { mainStyleAdapter, StylizedMain } from './Main.styled'

const Main = () => {
  const darkMode = useDarkMode()

  const sections = useMemo(
    () => ({
      [Sections.SALES]: <Section sectionId={Sections.SALES} title="SALES" />,
      [Sections.OFFERS]: <Section sectionId={Sections.OFFERS} title="OFFERS" />,
      [Sections.PRODUCTS]: <Section sectionId={Sections.PRODUCTS} title="PRODUCTS" />,
      [Sections.MANUFACTURERS]: (
        <Section sectionId={Sections.MANUFACTURERS} title="MANUFACTURERS" />
      ),
      [Sections.CATEGORIES]: <Section sectionId={Sections.CATEGORIES} title="CATEGORIES" />,
      [Sections.USERS]: <Section sectionId={Sections.USERS} title="USERS" />,
      [Sections.ME]: <Section sectionId={Sections.ME} title="ME" />,
    }),
    []
  )

  const sectionActiveState = useSelector((store: AppStore) => store.sectionActive)

  return (
    <StylizedMain p={mainStyleAdapter(darkMode)}>
      <div className="container">
        <SwitchTransition>
          <CSSTransition
            key={sectionActiveState}
            classNames="fade"
            addEndListener={(node, done) =>
              node.addEventListener('transitionend', done, false)
            }
          >
            <div className="animation-container">{sections[sectionActiveState]}</div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </StylizedMain>
  )
}

export default Main
