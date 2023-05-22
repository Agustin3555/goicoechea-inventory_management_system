import styled from 'styled-components'
import { FONT_SIZE, MICROINTERACTION, NOT_FONT_SIZE, Value, shadowAdapter } from '@/styles'
import { MAIN_GAP, glassBackgroundColorAdapter, BLUR } from '@/tools'

interface Provider {
  padding: Value
  backgroundColor: Value
}

const PADDING = MAIN_GAP

const paddingLeft = `calc(${MAIN_GAP} * 3 + ${FONT_SIZE.s} * 2 + ${FONT_SIZE.m})`
const paddingRight = `calc(${MAIN_GAP} + 200px)`
const padding = `${PADDING} ${paddingRight} ${PADDING} ${paddingLeft}`

export namespace MainStyled {
  export const adapter = (darkMode: boolean): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {
      padding,
      backgroundColor: glassBackgroundColorAdapter(darkMode),
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    height: 100%;
    padding: ${({ p }) => p.padding};
    transition: padding ${MICROINTERACTION.s} ease-out;

    .container {
      height: 100%;
      padding: ${MAIN_GAP};
      border-radius: calc(${NOT_FONT_SIZE['4xs']} + ${MAIN_GAP});
      background-color: ${({ p }) => p.backgroundColor};
      box-shadow: ${shadowAdapter(2)};
      backdrop-filter: ${BLUR};
      transition: border-radius ${MICROINTERACTION.s} ease-out,
        background-color ${MICROINTERACTION.s} ease-out;

      .animation-container {
        height: 100%;
        transition: opacity ${MICROINTERACTION.xs} ease-out;
      }

      .fade-enter {
        opacity: 0;
      }

      .fade-exit {
        opacity: 1;
      }

      .fade-enter-active {
        opacity: 1;
      }

      .fade-exit-active {
        opacity: 0;
      }
    }

    @media (max-width: 89.9375rem) {
      padding-right: ${MAIN_GAP};
      padding-left: ${MAIN_GAP};
    }

    @media (max-width: 26.5625rem) {
      padding: 0;

      .container {
        border-radius: 0;
      }
    }
  `
}
