import { Icon } from '@/components'
import { useDarkMode } from '@/hooks'
import { setSectionActive } from '@/redux/states/sectionActive.state'
import { AppStore } from '@/redux/store'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sectionButtonStyleAdapter, StylizedSectionButton } from './SectionButton.styled'

const SectionButton = ({
  id,
  title,
  iconName,
}: {
  id: string
  title: string
  iconName: string
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const active = useSelector((store: AppStore) => store.sectionActive === id)

  const handleChange = useCallback(() => {
    dispatch(setSectionActive(id))
  }, [])

  return (
    <StylizedSectionButton p={sectionButtonStyleAdapter(darkMode, active)}>
      <label className="label" htmlFor={id} />
      <input
        className="input"
        type="radio"
        name="section"
        id={id}
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
