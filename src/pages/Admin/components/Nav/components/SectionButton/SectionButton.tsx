import { Icon } from '@/components'
import { useDarkMode } from '@/hooks'
import { Sections } from '@/models'
import { setSectionActive } from '@/redux/states/sectionActive.state'
import { AppStore } from '@/redux/store'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sectionButtonStyleAdapter, StylizedSectionButton } from './SectionButton.styled'

const SectionButton = ({
  sectionId,
  title,
  iconName,
}: {
  sectionId: Sections
  title: string
  iconName: string
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const active = useSelector((store: AppStore) => store.sectionActive === sectionId)

  const handleChange = useCallback(() => {
    dispatch(setSectionActive(sectionId))
  }, [])

  return (
    <StylizedSectionButton p={sectionButtonStyleAdapter(darkMode, active)}>
      <label className="label" htmlFor={sectionId} />
      <input
        className="input"
        type="radio"
        name="section"
        id={sectionId}
        title={title}
        checked={active}
        onChange={handleChange}
      />
      <div className="fake">
        <Icon iconName={iconName} style={{ size: 'm' }} />
      </div>
    </StylizedSectionButton>
  )
}

export default SectionButton
