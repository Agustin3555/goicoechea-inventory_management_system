import { ToggleDarkMode } from '@/components'
import { useDarkMode } from '@/hooks'
import { Sections } from '@/models'
import { AppStore } from '@/redux/store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { SectionButton } from './components'
import { navStyleAdapter, StylizedNav } from './Nav.styled'

const sections = {
  sales: {
    sectionId: Sections.SALES,
    title: 'Ventas',
    iconName: 'fa-solid fa-cash-register',
  },
  offers: {
    sectionId: Sections.OFFERS,
    title: 'Ofertas',
    iconName: 'fa-solid fa-fire',
  },
  products: {
    sectionId: Sections.PRODUCTS,
    title: 'Productos',
    iconName: 'fa-solid fa-boxes-stacked',
  },
  manufactures: {
    sectionId: Sections.MANUFACTURERS,
    title: 'Fabricantes',
    iconName: 'fa-solid fa-industry',
  },
  categories: {
    sectionId: Sections.CATEGORIES,
    title: 'Categorías',
    iconName: 'fa-solid fa-sitemap',
  },
  users: {
    sectionId: Sections.USERS,
    title: 'Usuarios',
    iconName: 'fa-solid fa-users',
  },
  me: {
    sectionId: Sections.ME,
    title: 'Mi usuario',
    iconName: 'fa-solid fa-user',
  },
}

const adminSections = [
  sections.sales,
  sections.offers,
  sections.products,
  sections.manufactures,
  sections.categories,
  sections.users,
]

const employeeSections = [
  sections.sales,
  sections.offers,
  sections.products,
  sections.manufactures,
  sections.categories,
]

const Nav = () => {
  const darkMode = useDarkMode()
  const userRole = useSelector((store: AppStore) => store.user.role)
  const showNavState = useSelector((store: AppStore) => store.showNav)

  const allowedUserSections = useMemo(() => {
    const sectionsByRole = {
      ADMIN: adminSections,
      EMPLOYEE: employeeSections,
    }

    return sectionsByRole[userRole]
  }, [])

  return (
    <StylizedNav p={navStyleAdapter(darkMode, showNavState)}>
      <nav className="top">
        <ul className="items">
          {allowedUserSections.map(section => (
            <li key={section.sectionId}>
              <SectionButton {...section} />
            </li>
          ))}
        </ul>
      </nav>
      <div className="bottom">
        <ToggleDarkMode />
        <nav>
          <ul className="items">
            <li key={sections.me.sectionId}>
              <SectionButton {...sections.me} />
            </li>
          </ul>
        </nav>
      </div>
    </StylizedNav>
  )
}

export default Nav
