import {
  colorAdapter,
  fontAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
} from '@/styles'
import { createGlobalStyle } from 'styled-components'

interface GlobalStyleProvider {
  all: {
    backgroundColor: string
    color: string
  }
  scrollbar: {
    width: string
  }
  scrollbarThumb: {
    backgroundColor: string
    hover: {
      backgroundColor: string
    }
  }
}

export const GlobalStyleAdapter = (darkMode: boolean): GlobalStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {
    all: {
      backgroundColor: colorAdapter(darkMode ? 'g-14' : 'g-4'),
      color: colorAdapter(darkMode ? 'g-4' : 'g-16'),
    },
    scrollbar: {
      width: notFontSizeAdapter('2xs'),
    },
    scrollbarThumb: {
      backgroundColor: colorAdapter(darkMode ? 'g-14' : 'g-4'),
      hover: {
        backgroundColor: colorAdapter(darkMode ? 'g-12' : 'g-6'),
      },
    },
  }
}

export const StylizedGlobalStyle = createGlobalStyle<{ p: GlobalStyleProvider }>`
  * {
    font-family: ${fontAdapter('p')};
    font-size: ${fontSizeAdapter('s')};
    line-height: ${fontSizeAdapter('s')};
    letter-spacing: calc(${notFontSizeAdapter('6xs')} * 0.333);
    word-spacing: ${notFontSizeAdapter('6xs')};
  }

  html {
    scroll-behavior: smooth;
  }

  *::selection {
    background-color: ${({ p }) => p.all.backgroundColor};
    color: ${({ p }) => p.all.color};
  }

  ::-webkit-scrollbar {
    width: ${({ p }) => p.scrollbar.width};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ p }) => p.scrollbarThumb.backgroundColor};
    border: 0;
    border-radius: ${notFontSizeAdapter('6xl')};

    :hover {
      background-color: ${({ p }) => p.scrollbarThumb.hover.backgroundColor};
    }
  }
`
