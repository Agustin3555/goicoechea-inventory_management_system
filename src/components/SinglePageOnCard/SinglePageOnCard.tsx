import { ToggleDarkMode } from '@/components'
import { useDarkMode } from '@/hooks'
import { SinglePageOnCardStyled } from './SinglePageOnCard.styled'

const SinglePageOnCard = ({
  title,
  children,
}: {
  title: string
  children: JSX.Element[] | JSX.Element
}) => {
  const darkMode = useDarkMode()

  return (
    <SinglePageOnCardStyled.Component p={SinglePageOnCardStyled.adapter(darkMode)}>
      <div className="card">
        <h1 className="title">{title}</h1>
        {children}
      </div>
      <div className="dark-mode-container">
        <ToggleDarkMode />
      </div>
    </SinglePageOnCardStyled.Component>
  )
}

export default SinglePageOnCard
