import { Button, Icon, Separator } from '@/components'
import { GeneratorStyled } from './Generator.styled'
import { css } from 'styled-components'
import { COLOR, NOT_FONT_SIZE } from '@/styles'
import { MAIN_GAP } from '@/tools'

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
      {title}
      <div className="generator-content">
        <Separator
          style={{
            thickness: NOT_FONT_SIZE['5xs'],
            backgroundColor: { dark: COLOR.g_8 },
          }}
        />
        <div className="generator-items">
          {children}
          <Button
            title="Agregar característica"
            handleClick={handleAdd}
            extraAttrs={{
              type: 'button',
            }}
            style={{
              tight: true,
              padding: MAIN_GAP,
              borderRadius: NOT_FONT_SIZE['4xs'],
              backgroundColor: { dark: COLOR.g_14, bright: COLOR.g_0 },
              styled: css`
                display: flex;
                gap: ${MAIN_GAP};
                width: fit-content;
              `,
            }}
          >
            <>
              <Icon iconName="fa-solid fa-plus" />
              Agregar
            </>
          </Button>
        </div>
      </div>
    </GeneratorStyled.Component>
  )
}

export default Generator
