import { useDarkMode } from '@/hooks'
import { NewStyled } from './New.styled'
import { ConfirmationButton, Icon } from '@/components'
import { COLOR, FONT_SIZE, NOT_FONT_SIZE } from '@/styles'
import { css } from 'styled-components'

const New = ({
  title,
  handleSend,
  children,
}: {
  title: string
  handleSend: () => Promise<boolean>
  children: JSX.Element | JSX.Element[]
}) => {
  const darkMode = useDarkMode()

  return (
    <NewStyled.Component p={NewStyled.adapter(darkMode)}>
      <h2 className="title">{title}</h2>
      <div className="fields">{children}</div>
      <ConfirmationButton
        title="Crear"
        text="Crear"
        iconName="fa-solid fa-arrow-right"
        trigger={handleSend}
        extraAttrs={{ type: 'button' }}
        style={{
          fontSize: FONT_SIZE.s,
          borderRadius: NOT_FONT_SIZE['3xs'],
          primaryBackgroundColor: { dark: COLOR.g_6, bright: COLOR.g_12 },
          color: { dark: COLOR.g_19, bright: COLOR.g_0 },
          styled: css`
            align-self: flex-end;
            width: 8.4375rem;
          `,
        }}
      />
    </NewStyled.Component>
  )
}

export default New
