import { useDarkMode } from '@/hooks'
import { useDispatch } from 'react-redux'
import { NewStyled } from './New.styled'
import { ConfirmationButton, Icon } from '@/components'
import { COLOR } from '@/styles'

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
    <NewStyled.Component p={NewStyled.adapter(darkMode)}>
      <h2 className="title">{title}</h2>
      <div className="fields">{children}</div>
      <ConfirmationButton
        title="Crear"
        trigger={handleSend}
        extraAttrs={{ type: 'button' }}
        style={{ backgroundColor: { dark: COLOR.g_10 } }}
      >
        <div className="content">
          <span className="text">Crear</span>
          <Icon iconName="" />
        </div>
      </ConfirmationButton>
    </NewStyled.Component>
  )
}

export default New
