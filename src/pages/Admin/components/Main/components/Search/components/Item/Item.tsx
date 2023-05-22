import { ConfirmationButton, Icon, Separator } from '@/components'
import { useChildAdjustment, useDarkMode } from '@/hooks'
import { useState } from 'react'
import Checkbox from '../Checkbox/Checkbox'
import CheckboxButton from '../CheckboxButton/CheckboxButton'
import { AppStore } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSelectItem } from '@/redux'
import { COLOR, FONT_SIZE, NOT_FONT_SIZE } from '@/styles'
import { ItemStyled } from './Item.styled'
import { css } from 'styled-components'

const Item = ({
  sectionKey,
  id,
  title,
  properties,
}: {
  sectionKey: string
  id: number
  title: string
  properties: JSX.Element | JSX.Element[]
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const item = useSelector((store: AppStore) => store.searchedData[sectionKey][id])
  const [expanded, setExpanded] = useState(false)
  const { childRef, childHeight } = useChildAdjustment()

  const selectOne = () => {
    dispatch(toggleSelectItem({ sectionKey, id }))
  }

  return (
    <ItemStyled.Component p={ItemStyled.adapter(darkMode, expanded, childHeight)}>
      <div className="item-head" onClick={() => setExpanded(!expanded)}>
        <Checkbox
          id={id.toString()}
          title={title}
          checked={item.meta.selected}
          handleChange={selectOne}
          style={{
            color: { dark: COLOR.g_0, bright: COLOR.g_16 },
            backgroundColor: { dark: COLOR.g_13, bright: COLOR.g_1 },
            styled: css`
              width: ${NOT_FONT_SIZE['4xl']};
            `,
          }}
        />
        <div className="actions">
          <CheckboxButton style={{ backgroundColor: { dark: COLOR.g_13, bright: COLOR.g_1 } }}>
            <Icon iconName="fa-solid fa-pen" style={{ size: FONT_SIZE.xs }} />
          </CheckboxButton>
          <ConfirmationButton
            trigger={() => console.log('Hola')}
            style={{
              padding: FONT_SIZE.xs,
              tight: true,
              borderRadius: NOT_FONT_SIZE['4xs'],
              backgroundColor: { dark: COLOR.g_13, bright: COLOR.g_1 },
            }}
          >
            <Icon iconName="fa-solid fa-trash" style={{ size: FONT_SIZE.xs }} />
          </ConfirmationButton>
        </div>
      </div>
      <div style={{ flexShrink: 1 }}>
        <Separator style={{ invert: true, backgroundColor: { dark: COLOR.g_8 } }} />
      </div>
      <div ref={childRef} className="properties">
        {properties}
      </div>
    </ItemStyled.Component>
  )
}

export default Item
