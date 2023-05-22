import styled from 'styled-components'
import { FONT_SIZE, MICROINTERACTION, Value, shadowAdapter } from '@/styles'
import { MAIN_GAP, glassBackgroundColorAdapter, BLUR, MAIN_BORDER_RADIUS } from '@/tools'

interface Provider {
  right: Value
  backgroundColor: Value
  boxShadow: Value
  mediaB: {
    width: Value
  }
}

export namespace RightPanelStyled {
  export const adapter = (darkMode: boolean, show: boolean): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {
      right: show ? '0' : '-200px',
      backgroundColor: glassBackgroundColorAdapter(darkMode),
      boxShadow: shadowAdapter(show ? 3 : 2),
      mediaB: {
        width: show
          ? `calc(100% - ((${MAIN_GAP} + ${FONT_SIZE.s}) * 2 + ${FONT_SIZE.m}))`
          : 'default',
      },
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    position: absolute;
    top: 0;
    right: ${({ p }) => p.right};
    /* TODO: cambiar luego para que se adapte a su contenido */
    width: 200px;
    height: 100%;
    padding: ${MAIN_GAP};
    border-radius: calc(${MAIN_BORDER_RADIUS} + ${MAIN_GAP});
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background-color: ${({ p }) => p.backgroundColor};
    box-shadow: ${({ p }) => p.boxShadow};
    backdrop-filter: ${BLUR};
    transition: right ${MICROINTERACTION.s} ease-out, width ${MICROINTERACTION.s} ease-out,
      background-color ${MICROINTERACTION.s} ease-out,
      box-shadow ${MICROINTERACTION.s} ease-out;

    @media (min-width: 90rem) {
      right: 0;
      top: ${MAIN_GAP};
      height: calc(100% - ${MAIN_GAP} * 2);
    }

    @media (max-width: 26.5625rem) {
      width: ${({ p }) => p.mediaB.width};
    }
  `
}
