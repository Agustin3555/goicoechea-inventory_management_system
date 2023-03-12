import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
} from '@/styles'

interface SectionStyleProvider {
  head: {
    color: string
  }
  separator: {
    backgroundColor: string
  }
}

export const sectionStyleAdapter = (darkMode: boolean): SectionStyleProvider => {
  // #region Auxiliary vars

  return {
    head: {
      color: colorAdapter(darkMode ? 'g-2' : 'g-14'),
    },
    separator: {
      backgroundColor: colorAdapter(darkMode ? 'g-8' : 'g-8'),
    },
  }
}

export const StylizedSection = styled.div<{ p: SectionStyleProvider }>`
  display: flex;
  flex-direction: column;
  gap: ${fontSizeAdapter('xs')};
  width: 100%;
  height: 100%;

  .head {
    display: flex;
    align-items: center;
    gap: ${fontSizeAdapter('xs')};
    color: ${({ p }) => p.head.color};
    transition: color ${microinteractionAdapter(2)} ease-out;

    .separator {
      width: ${notFontSizeAdapter('6xs')};
      height: ${fontSizeAdapter('xs')};
    }

    .title {
      width: 100%;
      font-size: ${fontSizeAdapter('m')};
      line-height: initial;
      font-weight: 500;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .separator {
    height: ${notFontSizeAdapter('6xs')};
    background-color: ${({ p }) => p.separator.backgroundColor};
    transition: background-color ${microinteractionAdapter(2)} ease-out;
  }

  .animation-container {
    width: 100%;
    height: 100%;
    transition: opacity ${microinteractionAdapter(1)} ease-out;
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

  @media (min-width: 90rem) {
    .head {
      .separator,
      .toggle-container {
        display: none;
      }
    }
  }

  @media (max-width: 26.5625rem) {
    .head {
      .icon-container {
        width: 100%;
      }

      .title {
        display: none;
      }
    }
  }
`
