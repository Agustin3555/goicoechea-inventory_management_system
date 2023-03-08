import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
} from '@/styles'

interface NavStyleProvider {}

export const navStyleAdapter = (darkMode: boolean): NavStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {}
}

export const StylizedNav = styled.div<{ p: NavStyleProvider }>``
