import styled from 'styled-components'
import { FONT_SIZE, MICROINTERACTION, Value, shadowAdapter } from '@/styles'
import { MAIN_GAP, glassBackgroundColorAdapter, BLUR, MAIN_BORDER_RADIUS } from '@/tools'

interface Provider {
  left: Value
  backgroundColor: Value
  boxShadow: Value
}

export namespace NavStyled {
  export const adapter = (darkMode: boolean, show: boolean): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {
      left: show ? '0' : `calc((${MAIN_GAP} * 3 + ${FONT_SIZE.s} * 2 + ${FONT_SIZE.m}) * -1)`,
      backgroundColor: glassBackgroundColorAdapter(darkMode),
      boxShadow: shadowAdapter(show ? 3 : 2),
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    position: absolute;
    top: 0;
    left: ${({ p }) => p.left};
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: ${MAIN_GAP};
    border-radius: calc(${MAIN_BORDER_RADIUS} + ${MAIN_GAP});
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: ${({ p }) => p.backgroundColor};
    box-shadow: ${({ p }) => p.boxShadow};
    backdrop-filter: ${BLUR};
    transition: inset ${MICROINTERACTION.s} ease-out,
      background-color ${MICROINTERACTION.s} ease-out,
      box-shadow ${MICROINTERACTION.s} ease-out;

    .items {
      display: flex;
      flex-direction: column;
      gap: ${MAIN_GAP};
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .bottom {
      display: flex;
      flex-direction: column;
      gap: ${MAIN_GAP};
    }

    @media (min-width: 90rem) {
      left: 0;
      top: ${MAIN_GAP};
      height: calc(100% - ${MAIN_GAP} * 2);
    }
  `
}
