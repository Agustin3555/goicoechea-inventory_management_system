import { Icon } from '@/components'
import { useDarkMode } from '@/hooks'
import { setSectionActive } from '@/redux/states/sectionActive.state'
import { AppStore } from '@/redux/store'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FONT_SIZE } from '@/styles'
import { SectionButtonStyled } from './SectionButton.styled'

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
    <SectionButtonStyled.Component p={SectionButtonStyled.adapter(darkMode, active)}>
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
      <div className="fake-button">
        <Icon iconName={iconName} style={{ size: FONT_SIZE.m }} />
      </div>
    </SectionButtonStyled.Component>
  )
}

export default SectionButton
