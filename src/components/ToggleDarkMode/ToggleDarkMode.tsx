import { toggleDarkModeStyleAdapter, StylizedToggleDarkMode } from './ToggleDarkMode.styled'
import { Icon } from '@/components'
import { useDispatch } from 'react-redux'
import { useDarkMode } from '@/hooks'
import { toggleDarkMode } from '@/redux/states/darkMode.state'

const ToggleDarkMode = () => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()

  const handleToggle = () => dispatch(toggleDarkMode())

  return (
    <StylizedToggleDarkMode p={toggleDarkModeStyleAdapter(darkMode)}>
      <div className="fake-button">
        <div className="sun">
          <Icon iconName="fa-solid fa-sun" style={{ size: 'm' }} />
        </div>
        <div className="moon">
          <Icon iconName="fa-solid fa-moon" style={{ size: 'm' }} />
        </div>
      </div>
      <label htmlFor="darkMode" />
      <input
        className="input"
        onChange={handleToggle}
        type="checkbox"
        id="darkMode"
        title="Alternar tema"
        checked={darkMode}
      />
    </StylizedToggleDarkMode>
  )
}

export default ToggleDarkMode
