import { toggleDarkModeStyleAdapter, StylizedToggleDarkMode } from './ToggleDarkMode.styled'
import { Icon } from '@/components'
import { MouseEventHandler, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useDarkMode } from '@/hooks'
import { toggleDarkMode } from '@/redux/states/darkMode.state'

const ToggleDarkMode = () => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()

  const handleToggle = useCallback<MouseEventHandler<HTMLInputElement>>(
    () => dispatch(toggleDarkMode()),
    []
  )

  return (
    <StylizedToggleDarkMode p={toggleDarkModeStyleAdapter(darkMode)}>
      <label htmlFor="darkMode" />
      <input
        className="checkbox"
        onClick={handleToggle}
        type="checkbox"
        id="darkMode"
        title="Alternar tema"
      />
      <div className="button">
        <div className="sun-container">
          <Icon iconName="fa-solid fa-sun" style={{ size: 'm' }} />
        </div>
        <div className="moon-container">
          <Icon iconName="fa-solid fa-moon" style={{ size: 'm' }} />
        </div>
      </div>
    </StylizedToggleDarkMode>
  )
}

export default ToggleDarkMode
