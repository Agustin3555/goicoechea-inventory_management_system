import { Button, Icon } from '@/components'
import { GeneratorStyled } from './Generator.styled'
import { css } from 'styled-components'
import { COLOR, FONT_SIZE, NOT_FONT_SIZE } from '@/styles'

const Generator = ({
  title,
  handleAdd,
  children,
}: {
  title: string
  handleAdd: () => void
  children: JSX.Element | JSX.Element[]
}) => {
  return (
    <GeneratorStyled.Component>
      <div className="generator-title">{title}</div>
      <div className="generator-container">
        {children}
        <Button
          title="Agregar característica"
          handleClick={handleAdd}
          extraAttrs={{
            type: 'button',
          }}
          style={{
            tight: true,
            padding: FONT_SIZE.xs,
            borderRadius: NOT_FONT_SIZE['4xs'],
            backgroundColor: { dark: COLOR.g_14, bright: COLOR.g_0 },
            styled: css`
              width: fit-content;
            `,
          }}
        >
          <div className="add-button-content">
            <Icon iconName="fa-solid fa-plus" />
            Agregar
          </div>
        </Button>
      </div>
    </GeneratorStyled.Component>
  )
}

export default Generator
