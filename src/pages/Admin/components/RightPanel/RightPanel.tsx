import { useDarkMode } from '@/hooks'
import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import { rightPanelStyleAdapter, StylizedRightPanel } from './RightPanel.styled'

const RightPanel = () => {
  const darkMode = useDarkMode()
  const showRightPanelState = useSelector((store: AppStore) => store.showRightPanel)

  return (
    <StylizedRightPanel
      p={rightPanelStyleAdapter(darkMode, showRightPanelState)}
    ></StylizedRightPanel>
  )
}

export default RightPanel
