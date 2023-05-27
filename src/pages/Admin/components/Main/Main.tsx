import { useDarkMode } from '@/hooks'
import { SECTION_KEYS } from '@/models'
import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import { Categories, Manufacturers, Me, Offers, Products, Sales, Users } from './components'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { MainStyled } from './Main.styled'

const COMPONENTS = {
  [SECTION_KEYS.sales]: <Sales />,
  [SECTION_KEYS.offers]: <Offers />,
  [SECTION_KEYS.products]: <Products />,
  [SECTION_KEYS.manufacturers]: <Manufacturers />,
  [SECTION_KEYS.categories]: <Categories />,
  [SECTION_KEYS.users]: <Users />,
  [SECTION_KEYS.me]: <Me />,
}

const Main = () => {
  const darkMode = useDarkMode()
  const sectionActiveState = useSelector((store: AppStore) => store.sectionActive)

  return (
    <MainStyled.Component p={MainStyled.adapter(darkMode)}>
      <div className="container">
        <SwitchTransition>
          <CSSTransition
            key={sectionActiveState}
            classNames="fade"
            addEndListener={(node, done) =>
              node.addEventListener('transitionend', done, false)
            }
          >
            <div className="animation-container">{COMPONENTS[sectionActiveState]}</div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </MainStyled.Component>
  )
}

export default Main
