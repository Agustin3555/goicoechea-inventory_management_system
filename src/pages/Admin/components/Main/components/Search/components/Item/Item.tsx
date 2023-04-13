import { ConfirmationButton, Icon, Separator } from '@/components'
import { useDarkMode } from '@/hooks'
import { useRef, useState } from 'react'
import Checkbox from '../Checkbox/Checkbox'
import CheckboxButton from '../CheckboxButton/CheckboxButton'
import DimensionObserver from '../DimensionObserver/DimensionObserver'
import { itemStyleAdapter, StylizedItem } from './Item.styled'

const Item = ({ id, title }: { id: string; title: string }) => {
  const darkMode = useDarkMode()
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <StylizedItem p={itemStyleAdapter(darkMode, expanded, ref.current?.clientHeight)}>
      <div className="item-head" onClick={() => setExpanded(!expanded)}>
        <Checkbox
          id={id}
          title={title}
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
      <div ref={ref} className="test">
        {ref.current && ref.current.clientWidth}
      </div>
      {/* <DimensionObserver ref={ref}>
        <div className="test">{ref.current.}</div>
      </DimensionObserver> */}
    </StylizedItem>
  )
}

export default Item