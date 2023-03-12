import { useDarkMode } from '@/hooks'
import { Sections } from '@/models'
import { AppStore } from '@/redux/store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Categories, Manufacturers, Me, Offers, Products, Sales, Users } from './components'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { mainStyleAdapter, StylizedMain } from './Main.styled'

const Main = () => {
  const darkMode = useDarkMode()

  const sections = useMemo(
    () => ({
      [Sections.SALES.key]: <Sales />,
      [Sections.OFFERS.key]: <Offers />,
      [Sections.PRODUCTS.key]: <Products />,
      [Sections.MANUFACTURERS.key]: <Manufacturers />,
      [Sections.CATEGORIES.key]: <Categories />,
      [Sections.USERS.key]: <Users />,
      [Sections.ME.key]: <Me />,
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
