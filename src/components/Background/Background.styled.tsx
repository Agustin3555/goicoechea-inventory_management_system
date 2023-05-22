import styled from 'styled-components'
import { COLOR, MICROINTERACTION } from '@/styles'

interface Provider {
  backgroundColor: string
}

export namespace BackgroundStyled {
  export const adapter = (darkMode: boolean): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {
      backgroundColor: darkMode ? COLOR.g_10 : COLOR.g_8,
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ p }) => p.backgroundColor};
    overflow: hidden;
    transition: background-color ${MICROINTERACTION.s} ease-out;
  `
}
