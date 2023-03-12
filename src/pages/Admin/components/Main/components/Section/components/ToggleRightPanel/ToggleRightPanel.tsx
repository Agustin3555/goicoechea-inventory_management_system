import { toggleShowRightPanel } from '@/redux/states/showRightPanel.state'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import TogglePanel from '../TogglePanel/TogglePanel'

const ToggleRightPanel = () => {
  const dispatch = useDispatch()

  const handleClick = useCallback(() => dispatch(toggleShowRightPanel()), [])

  return (
    <TogglePanel
      title="Abrir panel derecho"
      handleClick={handleClick}
      iconName="fa-solid fa-arrow-left-long"
      text="Avanzado"
      invert
    />
  )
}

export default ToggleRightPanel
