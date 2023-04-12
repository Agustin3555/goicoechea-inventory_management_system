import { useDarkMode } from '@/hooks'
import { useDispatch } from 'react-redux'
import { newStyleAdapter, StylizedNew } from './New.styled'

const New = ({
  title,
  children,
}: {
  title: string
  children: JSX.Element | JSX.Element[]
}) => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()

  return (
    <StylizedNew p={newStyleAdapter(darkMode)}>
      <h2 className="title">{title}</h2>
      <div className="fields">{children}</div>
    </StylizedNew>
  )
}

export default New
