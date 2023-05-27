import { Icon, Separator } from '@/components'
import { useDarkMode } from '@/hooks'
import { ChangeEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR, FONT_SIZE } from '@/styles'
import { ViewSelectorStyled } from './ViewSelector.styled'
import { SECTIONS, SECTION_KEYS } from '@/models'
import { AppStore, setActiveViews } from '@/redux'

const ViewSelector = ({ sectionKey }: { sectionKey: SECTION_KEYS }) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const viewSelectedKey = useSelector((store: AppStore) => store.activeViews[sectionKey])
  const viewSelected = SECTIONS[sectionKey].views[viewSelectedKey]

  const views = Object.keys(SECTIONS[sectionKey].views).map(key => ({
    viewKey: key,
    ...SECTIONS[sectionKey].views[key],
  }))

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { id } = event.target

    dispatch(setActiveViews({ sectionKey, viewKey: id }))
  }

  return (
    <ViewSelectorStyled.Component p={ViewSelectorStyled.adapter(darkMode, views.length)}>
      <div className="main-container">
        <div className="selected" title="Vistas">
          <div className="group">
            <Icon iconName={viewSelected.iconName} style={{ size: FONT_SIZE.xs }} />
            <span className="text">{viewSelected.title}</span>
          </div>
          <Separator style={{ long: 'expanded', backgroundColor: { dark: COLOR.g_8 } }} />
          <Icon iconName="fa-solid fa-chevron-down" style={{ size: FONT_SIZE.xs }} />
        </div>
        <div className="items">
          {views.map(item => (
            <div className="item" key={item.viewKey}>
              <label htmlFor={item.viewKey} />
              <input
                className="input"
                type="radio"
                name="view"
                id={item.viewKey}
                title={item.title}
                checked={viewSelectedKey === item.viewKey}
                onChange={handleChange}
              />
              <div className="fake">
                <Icon iconName={item.iconName} style={{ size: FONT_SIZE.xs }} />
                <span className="text">{item.title}</span>
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
