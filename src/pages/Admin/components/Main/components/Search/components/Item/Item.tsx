import { ConfirmationButton, Icon, Separator } from '@/components'
import { useChildAdjustment, useDarkMode } from '@/hooks'
import { useState } from 'react'
import Checkbox from '../Checkbox/Checkbox'
import CheckboxButton from '../CheckboxButton/CheckboxButton'
import { itemStyleAdapter, StylizedItem } from './Item.styled'
import { AppStore } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSelectItem } from '@/redux'

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
    <StylizedItem p={itemStyleAdapter(darkMode, expanded, childHeight)}>
      <div className="item-head" onClick={() => setExpanded(!expanded)}>
        <Checkbox
          id={id.toString()}
          title={title}
          checked={item.meta.selected}
          handleChange={selectOne}
          style={{
            width: '4xl',
            color: { dark: 'g-0', bright: 'g-16' },
            backgroundColor: { dark: 'g-13', bright: 'g-1' },
          }}
        />
        <div className="actions">
          <CheckboxButton style={{ backgroundColor: { dark: 'g-13', bright: 'g-1' } }}>
            <Icon iconName="fa-solid fa-pen" style={{ size: 'xs' }} />
          </CheckboxButton>
          <ConfirmationButton
            trigger={() => console.log('Hola')}
            style={{
              padding: 'xs',
              tight: true,
              borderRadius: '4xs',
              backgroundColor: { dark: 'g-13', bright: 'g-1' },
            }}
          >
            <Icon iconName="fa-solid fa-trash" style={{ size: 'xs' }} />
          </ConfirmationButton>
        </div>
      </div>
      <div style={{ flexShrink: 1 }}>
        <Separator style={{ invert: true, backgroundColor: { dark: 'g-8' } }} />
      </div>
      <div ref={childRef} className="properties">
        {properties}
      </div>
    </StylizedItem>
  )
}

export default Item
