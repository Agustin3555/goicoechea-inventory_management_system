import { useDarkMode } from '@/hooks'
import { spinnerStyleAdapter, StylizedSpinner } from './Spinner.styled'

const Spinner = () => {
  const darkMode = useDarkMode()

  return <StylizedSpinner p={spinnerStyleAdapter(darkMode)} />
}

export default Spinner
