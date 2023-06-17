import { Button, ConfirmationButton, Icon, Separator } from '@/components'
import { useChildAdjustment, useDarkMode } from '@/hooks'
import { MouseEventHandler, useState } from 'react'
import Checkbox from '../Checkbox/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR, MICROINTERACTION, NOT_FONT_SIZE } from '@/styles'
import { ItemStyled } from './Item.styled'
import { css } from 'styled-components'
import { SECTION_KEYS } from '@/models'
import { AppStore, toggleSelectItem } from '@/redux'
import { MAIN_GAP } from '@/tools'

const Item = ({
  sectionKey,
  id,
  title,
  properties,
}: {
  sectionKey: SECTION_KEYS
  id: number
  title: string
  properties: JSX.Element | JSX.Element[]
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const item = useSelector((store: AppStore) => store.searchedData[sectionKey][id])
  const [expanded, setExpanded] = useState(false)
  const { childRef, childHeight } = useChildAdjustment()

  const handleSelectItem = () => {
    dispatch(toggleSelectItem({ sectionKey, id }))
  }

  const handleToggleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <ItemStyled.Component p={ItemStyled.adapter(darkMode, expanded, childHeight)}>
      <div className="item-head">
        <Checkbox
          id={id.toString()}
          title={`Seleccionar ${title}`}
          text={title}
          checked={item.meta.selected}
          handleChange={handleSelectItem}
          style={{
            inactiveValueColor: { dark: COLOR.g_0, bright: COLOR.g_16 },
            inactiveBackgroundColor: { dark: COLOR.g_15, bright: COLOR.g_1 },
            styled: css`
              width: ${NOT_FONT_SIZE['3xl']};
            `,
          }}
        />
        <div className="actions">
          <Button
            title={expanded ? 'Cerrar' : 'Abrir'}
            handleClick={handleToggleExpandClick}
            style={{
              padding: MAIN_GAP,
              backgroundColor: { dark: COLOR.g_13, bright: COLOR.g_1 },
              styled: css`
                display: flex;
                justify-content: center;
                flex-grow: 1;
              `,
            }}
          >
            <Icon
              iconName="fa-solid fa-chevron-down"
              style={{
                styled: css`
                  transition: transform ${MICROINTERACTION.s} ease-out;
                  transform: rotate(${expanded ? '-180' : '0'}deg);
                `,
              }}
            />
          </Button>
          <ConfirmationButton
            title={`Borrar ${title}`}
            iconName="fa-solid fa-trash"
            trigger={() => console.log('Hola')}
            style={{
              borderRadius: NOT_FONT_SIZE['4xs'],
              primaryBackgroundColor: { dark: COLOR.g_13, bright: COLOR.g_1 },
            }}
          />
        </div>
      </div>
      <Separator
        style={{
          invert: true,
          backgroundColor: { dark: COLOR.g_8 },
          styled: css`
            flex-shrink: 0;
            flex-grow: 0;
          `,
        }}
      />
      <div ref={childRef} className="properties">
        {properties}
      </div>
    </ItemStyled.Component>
  )
}

export default Item
