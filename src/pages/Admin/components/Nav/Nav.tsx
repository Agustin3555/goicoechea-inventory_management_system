import { useDarkMode } from '@/hooks'
import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import { navStyleAdapter, StylizedNav } from './Nav.styled'

const Nav = () => {
  const darkMode = useDarkMode()

  return <StylizedNav p={navStyleAdapter(darkMode)}></StylizedNav>
}

export default Nav
