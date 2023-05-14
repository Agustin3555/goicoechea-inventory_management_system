import { useDarkMode } from '@/hooks'
import { useDispatch } from 'react-redux'
import { newStyleAdapter, StylizedNew } from './New.styled'
import { ConfirmationButton, Icon } from '@/components'

const New = ({
  title,
  handleSend,
  children,
}: {
  title: string
  handleSend: () => Promise<void>
  children: JSX.Element | JSX.Element[]
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()

  return (
    <StylizedNew p={newStyleAdapter(darkMode)}>
      <h2 className="title">{title}</h2>
      <div className="fields">{children}</div>
      <ConfirmationButton
        title="Crear"
        trigger={handleSend}
        extraAttrs={{ type: 'button' }}
        style={{ backgroundColor: { dark: 'g-10' } }}
      >
        <div className="content">
          <span className="text">Crear</span>
          <Icon iconName="" />
        </div>
      </ConfirmationButton>
    </StylizedNew>
  )
}

export default New
