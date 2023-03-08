import { useDarkMode } from '@/hooks'
import { GlobalStyleAdapter, StylizedGlobalStyle } from './GlobalStyle.styled'

export const GlobalStyle = () => {
  const darkMode = useDarkMode()

  return <StylizedGlobalStyle p={GlobalStyleAdapter(darkMode)} />
}
