import { useDarkMode } from '@/hooks'
import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import { RightPanelStyled } from './RightPanel.styled'

const RightPanel = () => {
  const darkMode = useDarkMode()
  const showRightPanelState = useSelector((store: AppStore) => store.showRightPanel)

  return (
    <RightPanelStyled.Component
      p={RightPanelStyled.adapter(darkMode, showRightPanelState)}
    ></RightPanelStyled.Component>
  )
}

export default RightPanel
