import { useDarkMode } from '@/hooks'
import ToggleNav from '../ToggleNav/ToggleNav'
import ToggleRightPanel from '../ToggleRightPanel/ToggleRightPanel'
import { sectionStyleAdapter, StylizedSection } from './Section.styled'

const Section = ({ title }: { title: string }) => {
  const darkMode = useDarkMode()

  return (
    <StylizedSection p={sectionStyleAdapter(darkMode)}>
      <div className="head">
        <div className="toggle-container">
          <ToggleNav />
        </div>
        <div className="separator" />
        <h1 className="title">{title}</h1>
        <div className="separator" />
        <div className="toggle-container">
          <ToggleRightPanel />
        </div>
      </div>
      <div className="separator" />
    </StylizedSection>
  )
}

export default Section
