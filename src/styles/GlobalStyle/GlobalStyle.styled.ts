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
  :root {
  --font-p: 'Inter', Segoe UI;
  --font-s: 'Cascadia Code', Segoe UI;
  --font-t: 'Inter', Segoe UI;

  --size-font-xs: 0.8125rem;
  --size-font-s: 1rem;
  --size-font-m: 1.25rem;
  --size-font-l: 1.5rem;
  --size-font-xl: 1.875rem;

  --size-notFont-6xs: 0.0625rem;
  --size-notFont-5xs: 0.125rem;
  --size-notFont-4xs: 0.25rem;
  --size-notFont-3xs: 0.375rem;
  --size-notFont-2xs: 0.625rem;
  --size-notFont-xs: 1rem;
  --size-notFont-s: 1.625rem;
  --size-notFont-m: 2.625rem;
  --size-notFont-l: 4.25rem;
  --size-notFont-xl: 6.875rem;
  --size-notFont-2xl: 11.0625rem;
  --size-notFont-3xl: 17.9375rem;
  --size-notFont-4xl: 29rem;
  --size-notFont-5xl: 47rem;
  --size-notFont-6xl: 76rem;

  --color-a-d2: #903522;
  --color-a-d1: #af4129;
  --color-a: #ce4c30;
  --color-a-b1: #d5674f;
  --color-a-b2: #dd826e;

  --color-b-d2: #000000;
  --color-b-d1: #000000;
  --color-b: #000000;
  --color-b-b1: #000000;
  --color-b-b2: #000000;

  --color-c-d2: #000000;
  --color-c-d1: #000000;
  --color-c: #000000;
  --color-c-b1: #000000;
  --color-c-b2: #000000;

  --color-d-d2: #000000;
  --color-d-d1: #000000;
  --color-d: #000000;
  --color-d-b1: #000000;
  --color-d-b2: #000000;

  --color-g-19: #000000;
  --color-g-18: #0d0d0d;
  --color-g-17: #1b1b1b;
  --color-g-16: #282828;
  --color-g-15: #363636;
  --color-g-14: #434343;
  --color-g-13: #515151;
  --color-g-12: #5e5e5e;
  --color-g-11: #6b6b6b;
  --color-g-10: #797979;
  --color-g-9: #868686;
  --color-g-8: #949494;
  --color-g-7: #a1a1a1;
  --color-g-6: #afafaf;
  --color-g-5: #bcbcbc;
  --color-g-4: #c9c9c9;
  --color-g-3: #d7d7d7;
  --color-g-2: #e4e4e4;
  --color-g-1: #f2f2f2;
  --color-g-0: #ffffff;

  --time-microinteraction-1: 0.125s;
  --time-microinteraction-2: 0.25s;
  --time-microinteraction-3: 0.5s;
  --time-microinteraction-4: 1s;
  --time-microinteraction-5: 2s;
}


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
