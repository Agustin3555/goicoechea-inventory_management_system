import { useDarkMode } from '@/hooks'
import { SpinnerStyled } from './Spinner.styled'

const Spinner = ({ style }: { style?: SpinnerStyled.Props }) => {
  const darkMode = useDarkMode()

  return <SpinnerStyled.Component p={SpinnerStyled.adapter(darkMode, style)} />
}

export default Spinner
