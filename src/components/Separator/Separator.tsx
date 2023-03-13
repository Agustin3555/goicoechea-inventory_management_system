import { useDarkMode } from '@/hooks'
import {
  separatorStyleAdapter,
  StylizedSeparator,
  SeparatorStyleProps,
} from './Separator.styled'

const Separator = ({ style }: { style: SeparatorStyleProps }) => {
  const darkMode = useDarkMode()

  return <StylizedSeparator p={separatorStyleAdapter(darkMode, style)} />
}

export default Separator
