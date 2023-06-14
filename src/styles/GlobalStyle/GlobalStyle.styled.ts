import { createGlobalStyle } from 'styled-components'
import { Value } from '../types'
import { COLOR, FONT, FONT_SIZE, NOT_FONT_SIZE } from '../enums'
// TODO: por que no puedo llamar directamente a '@/styles'?

export namespace GlobalStyleStyled {
  interface Provider {
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
      scrollbarThumb: {
        backgroundColor: darkMode ? COLOR.g_14 : COLOR.g_4,
        hover: {
          backgroundColor: darkMode ? COLOR.g_12 : COLOR.g_6,
        },
      },
    }
  }

  export const Component = createGlobalStyle<{ p: Provider }>`
    * {
      color: inherit;
    }

    html {
      font-family: ${FONT.p};
      scroll-behavior: smooth;

      body * {
        font-size: ${FONT_SIZE.xs};
        line-height: ${FONT_SIZE['2xs']};
        letter-spacing: calc(${NOT_FONT_SIZE['6xs']} * 0.333);
        word-spacing: ${NOT_FONT_SIZE['6xs']};

        ::selection {
          background-color: ${COLOR.b};
          color: ${COLOR.g_0};
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
