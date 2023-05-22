import { ToggleDarkMode } from '@/components'
import { useDarkMode } from '@/hooks'
import { Sections } from '@/models'
import { AppStore } from '@/redux/store'
import { exclude } from '@/tools'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { SectionButton } from './components'
import { NavStyled } from './Nav.styled'

const sections = {
  [Sections.SALES.key]: {
    ...exclude(Sections.SALES, ['views']),
  },
  [Sections.OFFERS.key]: {
    ...exclude(Sections.OFFERS, ['views']),
  },
  [Sections.PRODUCTS.key]: {
    ...exclude(Sections.PRODUCTS, ['views']),
  },
  [Sections.MANUFACTURERS.key]: {
    ...exclude(Sections.MANUFACTURERS, ['views']),
  },
  [Sections.CATEGORIES.key]: {
    ...exclude(Sections.CATEGORIES, ['views']),
  },
  [Sections.USERS.key]: {
    ...exclude(Sections.USERS, ['views']),
  },
  [Sections.ME.key]: {
    ...exclude(Sections.ME, ['views']),
  },
}

const adminSections = [
  sections[Sections.SALES.key],
  sections[Sections.OFFERS.key],
  sections[Sections.PRODUCTS.key],
  sections[Sections.MANUFACTURERS.key],
  sections[Sections.CATEGORIES.key],
  sections[Sections.USERS.key],
]

const employeeSections = [
  sections[Sections.SALES.key],
  sections[Sections.OFFERS.key],
  sections[Sections.PRODUCTS.key],
  sections[Sections.MANUFACTURERS.key],
  sections[Sections.CATEGORIES.key],
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
    <NavStyled.Component p={NavStyled.adapter(darkMode, showNavState)}>
      <nav className="top">
        <ul className="items">
          {allowedUserSections.map(section => (
            <li key={section.key}>
              <SectionButton
                id={section.key}
                title={section.title}
                iconName={section.iconName}
              />
            </li>
          ))}
        </ul>
      </nav>
      <div className="bottom">
        <ToggleDarkMode />
        <nav>
          <ul className="items">
            <li key={Sections.ME.key}>
              <SectionButton
                id={Sections.ME.key}
                title={Sections.ME.title}
                iconName={Sections.ME.iconName}
              />
            </li>
          </ul>
        </nav>
      </div>
    </NavStyled.Component>
  )
}

export default Nav
