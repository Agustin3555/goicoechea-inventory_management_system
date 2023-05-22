import styled from 'styled-components'
import { COLOR, FONT_SIZE, MICROINTERACTION, Value } from '@/styles'

interface Provider {
  color: Value
}

export namespace FieldNameStyled {
  export const adapter = (darkMode: boolean): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {
      color: darkMode ? COLOR.g_4 : COLOR.g_12,
    }
  }

  export const Component = styled.span<{ p: Provider }>`
    display: block;
    color: ${({ p }) => p.color};
    transition: color ${MICROINTERACTION.s} ease-out;
  `
}
