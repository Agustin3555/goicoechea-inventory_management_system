import { Icon } from '@/components'
import { useDispatch } from 'react-redux'
import { useDarkMode } from '@/hooks'
import { FONT_SIZE } from '@/styles'
import { toggleDarkMode } from '@/redux'
import { ToggleDarkModeStyled } from './ToggleDarkMode.styled'

const ToggleDarkMode = () => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()

  const handleToggle = () => dispatch(toggleDarkMode())

  return (
    <ToggleDarkModeStyled.Component p={ToggleDarkModeStyled.adapter(darkMode)}>
      <div className="fake-button">
        <div className="sun">
          <Icon iconName="fa-solid fa-sun" style={{ size: FONT_SIZE.m }} />
        </div>
        <div className="moon">
          <Icon iconName="fa-solid fa-moon" style={{ size: FONT_SIZE.m }} />
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
    </ToggleDarkModeStyled.Component>
  )
}

export default ToggleDarkMode
