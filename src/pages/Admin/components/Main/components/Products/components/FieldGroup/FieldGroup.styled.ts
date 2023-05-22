import { FONT_SIZE } from '@/styles'
import styled from 'styled-components'

interface Provider {}

export namespace FieldGroupStyled {
  export const adapter = (): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {}
  }

  export const Component = styled.form<{ p: Provider }>`
    display: flex;
    gap: ${FONT_SIZE.xs};
  `
}
