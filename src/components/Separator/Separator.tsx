import { useDarkMode } from '@/hooks'
import { SeparatorStyled } from './Separator.styled'

const Separator = ({ style }: { style: SeparatorStyled.Props }) => {
  const darkMode = useDarkMode()

  return <SeparatorStyled.Component p={SeparatorStyled.adapter(darkMode, style)} />
}

export default Separator
