import { Panel, ToggleDarkMode } from '@/components'
import { useDarkMode } from '@/hooks'
import {
  singlePageOnCardStyleAdapter,
  StylizedSinglePageOnCard,
} from './SinglePageOnCard.styled'

const SinglePageOnCard = ({
  title,
  children,
}: {
  title: string
  children: JSX.Element[] | JSX.Element
}) => {
  const darkMode = useDarkMode()

  return (
    <StylizedSinglePageOnCard p={singlePageOnCardStyleAdapter(darkMode)}>
      <div className="card">
        <h1 className="title">{title}</h1>
        {children}
      </div>
      <div className="dark-mode-container">
        <ToggleDarkMode />
      </div>
    </StylizedSinglePageOnCard>
  )
}

export default SinglePageOnCard
