import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

interface SectionStyleProvider {
  head: {
    title: {
      color: string
    }
  }
  separator: {
    backgroundColor: string
  }
}

export const sectionStyleAdapter = (darkMode: boolean): SectionStyleProvider => {
  // #region Auxiliary vars

  return {
    head: {
      title: {
        color: colorAdapter(darkMode ? 'g-4' : 'g-12'),
      },
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

    .separator {
      width: ${notFontSizeAdapter('6xs')};
      height: ${fontSizeAdapter('s')};
    }

    .title {
      width: 100%;
      font-size: ${fontSizeAdapter('m')};
      line-height: ${fontSizeAdapter('m')};
      color: ${({ p }) => p.head.title.color};
      transition: color ${microinteractionAdapter(2)} ease-out;
    }
  }

  .separator {
    height: ${notFontSizeAdapter('6xs')};
    background-color: ${({ p }) => p.separator.backgroundColor};
    transition: background-color ${microinteractionAdapter(2)} ease-out;
  }

  @media (min-width: 90rem) {
    .head {
      .separator,
      .toggle-container {
        display: none;
      }
    }
  }
`
