import { Button, Icon } from '@/components'
import { StylizedGenerator } from './Generator.styled'
import { css } from 'styled-components'

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
    <StylizedGenerator>
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
            padding: 'xs',
            borderRadius: '4xs',
            backgroundColor: { dark: 'g-14', bright: 'g-0' },
            styled: css`
              width: fit-content;
            `,
          }}
        >
          <div className="add-button-content">
            <Icon iconName="fa-solid fa-plus" />
            <div className="text">Agregar</div>
          </div>
        </Button>
      </div>
    </StylizedGenerator>
  )
}

export default Generator
