import { Icon, Separator } from '@/components'
import { useDarkMode } from '@/hooks'
import { setActiveViews } from '@/redux/states/activeViews.state'
import { AppStore } from '@/redux/store'
import { ChangeEventHandler, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR, FONT_SIZE, NOT_FONT_SIZE } from '@/styles'
import { ViewSelectorStyled } from './ViewSelector.styled'

const ViewSelector = ({
  sectionKey,
  views,
}: {
  sectionKey: string
  views: {
    id: string
    title: string
    iconName: string
  }[]
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()

  const initialView = useSelector(
    (store: AppStore) => views.filter(view => view.id === store.activeViews[sectionKey])[0]
  )

  const [selected, setSelected] = useState(initialView)

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { id } = event.target

    const value = views.filter(value => value.id === id)[0]

    dispatch(setActiveViews({ [sectionKey]: value.id }))
    setSelected(value)
  }

  return (
    <ViewSelectorStyled.Component p={ViewSelectorStyled.adapter(darkMode, views.length)}>
      <div className="main-container">
        <div className="selected" title="Vistas">
          <div className="group">
            <Icon iconName={selected.iconName} style={{ size: FONT_SIZE.xs }} />
            <span className="text">{selected.title}</span>
          </div>
          <Separator style={{ long: 'expanded', backgroundColor: { dark: COLOR.g_8 } }} />
          <Icon iconName="fa-solid fa-chevron-down" style={{ size: FONT_SIZE.xs }} />
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
                <Icon iconName={value.iconName} style={{ size: FONT_SIZE.xs }} />
                <span className="text">{value.title}</span>
                <div className="separation" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ViewSelectorStyled.Component>
  )
}

export default ViewSelector
