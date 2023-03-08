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
    backgroundColor: string
  }
  scrollbarThumb: {
    backgroundColor: string
    borderWidth: string
    borderColor: string
    hover: {
      borderColor: string
    }
  }
}

export const GlobalStyleAdapter = (darkMode: boolean): GlobalStyleProvider => {
  // #region Auxiliary vars

  const width = notFontSizeAdapter('3xs')
  const padding = notFontSizeAdapter('3xs')
  const backgroundColor = colorAdapter(darkMode ? 'g-16' : 'g-1')

  // #endregion

  return {
    all: {
      backgroundColor: colorAdapter(darkMode ? 'g-14' : 'g-4'),
      color: colorAdapter(darkMode ? 'g-4' : 'g-16'),
    },
    scrollbar: {
      width: `calc(${width} + ${padding} * 2)`,
      backgroundColor: backgroundColor,
    },
    scrollbarThumb: {
      backgroundColor: colorAdapter(darkMode ? 'g-14' : 'g-1'),
      borderWidth: padding,
      borderColor: backgroundColor,
      hover: {
        borderColor: colorAdapter(darkMode ? 'g-12' : 'g-1'),
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
    background-color: ${({ p }) => p.scrollbar.backgroundColor};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ p }) => p.scrollbarThumb.backgroundColor};
    border-width: ${({ p }) => p.scrollbarThumb.borderWidth};
    border-style: solid;
    border-color: ${({ p }) => p.scrollbarThumb.borderColor};
    border-radius: ${notFontSizeAdapter('6xl')};

    :hover {
      background-color: ${({ p }) => p.scrollbarThumb.hover.borderColor};
    }
  }
`
