import { Icon } from '@/components'
import { useDarkMode } from '@/hooks'
import { setSectionActive } from '@/redux/states/sectionActive.state'
import { AppStore } from '@/redux/store'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FONT_SIZE } from '@/styles'
import { SectionButtonStyled } from './SectionButton.styled'
import { SECTIONS, SECTION_KEYS } from '@/models'

const SectionButton = ({ sectionKey }: { sectionKey: SECTION_KEYS }) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const active = useSelector((store: AppStore) => store.sectionActive === sectionKey)

  const handleChange = useCallback(() => {
    dispatch(setSectionActive(sectionKey))
  }, [])

  return (
    <SectionButtonStyled.Component p={SectionButtonStyled.adapter(darkMode, active)}>
      <label className="label" htmlFor={sectionKey} />
      <input
        className="input"
        type="radio"
        name="section"
        id={sectionKey}
        title={SECTIONS[sectionKey].title}
        checked={active}
        onChange={handleChange}
      />
      <div className="fake-button">
        <Icon iconName={SECTIONS[sectionKey].iconName} style={{ size: FONT_SIZE.m }} />
      </div>
    </SectionButtonStyled.Component>
  )
}

export default SectionButton
