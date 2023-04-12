import { useDarkMode } from '@/hooks'
import { spinnerStyleAdapter, SpinnerStyleProps, StylizedSpinner } from './Spinner.styled'

const Spinner = ({ style }: { style?: SpinnerStyleProps }) => {
  const darkMode = useDarkMode()

  return <StylizedSpinner p={spinnerStyleAdapter(darkMode, style)} />
}

export default Spinner
