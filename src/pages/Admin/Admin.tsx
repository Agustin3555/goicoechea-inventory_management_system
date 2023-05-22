import { toggleShowNav } from '@/redux/states/showNav.state'
import { toggleShowRightPanel } from '@/redux/states/showRightPanel.state'
import { AppStore } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Main, Nav, RightPanel } from './components'
import { io } from 'socket.io-client'
import { getErrorInterpretation } from '@/tools'
import {
  MessageType,
  clearMessageQueue,
  enqueueMessage,
  setConnection,
  tickSectionUpdate,
} from '@/redux'
import { AdminStyled } from './Admin.styled'

const Admin = () => {
  const dispatch = useDispatch()
  const [enableEvent, setEnableEvent] = useState(true)
  const showNavState = useSelector((store: AppStore) => store.showNav)
  const showRightPanelState = useSelector((store: AppStore) => store.showRightPanel)
  const serverConnectedState = useSelector((store: AppStore) => store.serverConnected)

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      reconnectionDelay: 8250,
    })

    socket.on('connect', () => {
      dispatch(clearMessageQueue())

      dispatch(
        enqueueMessage({
          text: 'Conectado con éxito',
          type: MessageType.info,
        })
      )

      dispatch(setConnection(true))
    })

    socket.on('connect_error', (error: any) => {
      dispatch(
        enqueueMessage({
          text: getErrorInterpretation(error.type) as string,
          type: MessageType.error,
        })
      )

      if (serverConnectedState) dispatch(setConnection(false))
    })

    socket.on('updatedSection', (section: string) => {
      dispatch(tickSectionUpdate(section))

      dispatch(
        enqueueMessage({
          // TODO: cambiar a que se muestre bien la seccion
          text: `Se ha actualizado la sección de "${section}".`,
          type: MessageType.warning,
        })
      )
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleClick = () => {
    setEnableEvent(false)

    if (showNavState) dispatch(toggleShowNav())
    if (showRightPanelState) dispatch(toggleShowRightPanel())

    setEnableEvent(true)
  }

  return (
    <AdminStyled.Component>
      <Main />
      <div
        className="deep-touch"
        onClick={enableEvent ? handleClick : undefined}
        data-disable={!(showNavState || showRightPanelState)}
      />
      <Nav />
      <RightPanel />
    </AdminStyled.Component>
  )
}

export default Admin
