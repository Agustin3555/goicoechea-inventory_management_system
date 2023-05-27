import { ToggleDarkMode } from '@/components'
import { useDarkMode } from '@/hooks'
import { SECTION_KEYS, UserModels } from '@/models'
import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import { SectionButton } from './components'
import { NavStyled } from './Nav.styled'

// TODO: En un futuro se podria obtener esto de la API para que sea consistente con el backend
const ALLOWED_USER_SECTIONS: { [key: string]: SECTION_KEYS[] } = {
  [UserModels.ROLE.admin]: [
    SECTION_KEYS.sales,
    SECTION_KEYS.offers,
    SECTION_KEYS.products,
    SECTION_KEYS.manufacturers,
    SECTION_KEYS.categories,
    SECTION_KEYS.users,
  ],
  [UserModels.ROLE.employee]: [
    SECTION_KEYS.sales,
    SECTION_KEYS.offers,
    SECTION_KEYS.products,
    SECTION_KEYS.manufacturers,
    SECTION_KEYS.categories,
  ],
}

const Nav = () => {
  const darkMode = useDarkMode()
  const userRole = useSelector((store: AppStore) => store.user.role)
  const showNavState = useSelector((store: AppStore) => store.showNav)

  return (
    <NavStyled.Component p={NavStyled.adapter(darkMode, showNavState)}>
      <nav className="top">
        <ul className="items">
          {ALLOWED_USER_SECTIONS[userRole].map(item => (
            <li key={item}>
              <SectionButton sectionKey={item} />
            </li>
          ))}
        </ul>
      </nav>
      <div className="bottom">
        <ToggleDarkMode />
        <nav>
          <ul className="items">
            <li key={SECTION_KEYS.me}>
              <SectionButton sectionKey={SECTION_KEYS.me} />
            </li>
          </ul>
        </nav>
      </div>
    </NavStyled.Component>
  )
}

export default Nav
