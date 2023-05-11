import styled from 'styled-components'
import { colorAdapter, microinteractionAdapter } from '@/styles'

interface BackgroundStyleProvider {
  backgroundColor: string
}

export const backgroundStyleAdapter = (darkMode: boolean): BackgroundStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {
    backgroundColor: colorAdapter(darkMode ? 'g-10' : 'g-8'),
  }
}

export const StylizedBackground = styled.div<{ p: BackgroundStyleProvider }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ p }) => p.backgroundColor};
  overflow: hidden;
  transition: background-color ${microinteractionAdapter(2)} ease-out;
`
