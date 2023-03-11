import { toggleShowNav } from '@/redux/states/showNav.state'
import { toggleShowRightPanel } from '@/redux/states/showRightPanel.state'
import { AppStore } from '@/redux/store'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StylizedAdmin } from './Admin.styled'
import { Main, Nav, RightPanel } from './components'

const Admin = () => {
  const dispatch = useDispatch()
  const [enableEvent, setEnableEvent] = useState(true)
  const showNavState = useSelector((store: AppStore) => store.showNav)
  const showRightPanelState = useSelector((store: AppStore) => store.showRightPanel)

  const handleClick = () => {
    setEnableEvent(false)

    if (showNavState) dispatch(toggleShowNav())
    if (showRightPanelState) dispatch(toggleShowRightPanel())

    setEnableEvent(true)
  }

  return (
    <StylizedAdmin>
      <Main />
      <div
        className="deep-touch"
        onClick={enableEvent ? handleClick : undefined}
        data-disable={!(showNavState || showRightPanelState)}
      />
      <Nav />
      <RightPanel />
    </StylizedAdmin>
  )
}

export default Admin
