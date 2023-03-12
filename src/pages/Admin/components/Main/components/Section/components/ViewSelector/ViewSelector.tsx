import { Icon } from '@/components'
import { useDarkMode } from '@/hooks'
import { setActiveViews } from '@/redux/states/activeViews.state'
import { AppStore } from '@/redux/store'
import { ChangeEventHandler, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StylizedViewSelector, viewSelectorAdapter } from './ViewSelector.styled'

const ViewSelector = ({
  sectionId,
  views,
}: {
  sectionId: string
  views: {
    id: string
    title: string
    iconName: string
  }[]
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()

  const initialView = useSelector(
    (store: AppStore) => views.filter(view => view.id === store.activeViews[sectionId])[0]
  )

  const [selected, setSelected] = useState(initialView)

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { id } = event.target

    const value = views.filter(value => value.id === id)[0]

    dispatch(setActiveViews({ [sectionId]: value.id }))
    setSelected(value)
  }

  return (
    <StylizedViewSelector p={viewSelectorAdapter(darkMode, views.length)}>
      <div className="view-selector-container">
        <div className="selected" title="Vistas">
          <div className="group">
            <Icon iconName={selected.iconName} style={{ size: 'xs' }} />
            <span className="text">{selected.title}</span>
          </div>
          <div className="selected-separator" />
          <Icon iconName="fa-solid fa-chevron-down" style={{ size: 'xs' }} />
        </div>
        <div className="items">
          {views.map(value => (
            <div className="item" key={value.id}>
              <label htmlFor={value.id} />
              <input
                className="input"
                type="radio"
                name="view"
                id={value.id}
                title={value.title}
                checked={selected.id === value.id}
                onChange={handleChange}
              />
              <div className="fake">
                <Icon iconName={value.iconName} style={{ size: 'xs' }} />
                <span className="text">{value.title}</span>
                <div className="separation" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </StylizedViewSelector>
  )
}

export default ViewSelector
