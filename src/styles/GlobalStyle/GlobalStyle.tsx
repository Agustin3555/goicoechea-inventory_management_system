import { useDarkMode } from '@/hooks'
import { GlobalStyleStyled } from './GlobalStyle.styled'

export const GlobalStyle = () => {
  const darkMode = useDarkMode()

  return <GlobalStyleStyled.Component p={GlobalStyleStyled.adapter(darkMode)} />
}
