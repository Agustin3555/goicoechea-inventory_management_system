import { createGlobalStyle } from 'styled-components'
import { Value } from '../types'
import { COLOR, FONT, FONT_SIZE, NOT_FONT_SIZE } from '../enums'
import { MAIN_GAP } from '@/tools'
// TODO: por que no puedo llamar directamente a '@/styles'?

export namespace GlobalStyleStyled {
  interface Provider {
    all: {
      selection: {
        backgroundColor: Value
        color: Value
      }
    }
    scrollbarThumb: {
      backgroundColor: Value
      hover: {
        backgroundColor: Value
      }
    }
  }

  export const adapter = (darkMode: boolean): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {
      all: {
        selection: {
          backgroundColor: darkMode ? COLOR.g_14 : COLOR.g_4,
          color: darkMode ? COLOR.g_4 : COLOR.g_16,
        },
      },
      scrollbarThumb: {
        backgroundColor: darkMode ? COLOR.g_14 : COLOR.g_4,
        hover: {
          backgroundColor: darkMode ? COLOR.g_12 : COLOR.g_6,
        },
      },
    }
  }

  export const Component = createGlobalStyle<{ p: Provider }>`
    html {
      font-family: ${FONT.p};
      scroll-behavior: smooth;

      body * {
        font-size: ${FONT_SIZE.xs};
        line-height: ${MAIN_GAP};
        letter-spacing: calc(${NOT_FONT_SIZE['6xs']} * 0.333);
        word-spacing: ${NOT_FONT_SIZE['6xs']};

        ::selection {
          background-color: ${({ p }) => p.all.selection.backgroundColor};
          color: ${({ p }) => p.all.selection.color};
        }
      }
    }

    ::-webkit-scrollbar {
      width: ${NOT_FONT_SIZE['2xs']};
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ p }) => p.scrollbarThumb.backgroundColor};
      border: 0;
      border-radius: ${NOT_FONT_SIZE['6xl']};

      :hover {
        background-color: ${({ p }) => p.scrollbarThumb.hover.backgroundColor};
      }
    }
  `
}
