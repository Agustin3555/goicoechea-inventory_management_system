import styled from 'styled-components'
import { MAIN_GAP } from '@/tools'
import { COLOR, FONT_SIZE } from '@/styles'

interface Provider {}

export namespace ItemPropertyStyled {
  export const adapter = (darkMode: boolean): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {}
  }

  export const Component = styled.div<{ p: Provider }>`
    display: flex;
    flex-direction: column;
    gap: ${MAIN_GAP};

    .top,
    .bottom {
      display: flex;
      gap: ${MAIN_GAP};
      align-items: center;
    }

    .top .value {
      color: ${COLOR.g_0};
    }
  `
}
