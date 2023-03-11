import { toggleShowNav } from '@/redux/states/showNav.state'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import TogglePanel from '../TogglePanel/TogglePanel'

const ToggleNav = () => {
  const dispatch = useDispatch()

  const handleClick = useCallback(() => dispatch(toggleShowNav()), [])

  return (
    <TogglePanel
      title="Abrir navegación"
      handleClick={handleClick}
      iconName="fa-solid fa-arrow-right-long"
      text="Navegación"
    />
  )
}

export default ToggleNav
