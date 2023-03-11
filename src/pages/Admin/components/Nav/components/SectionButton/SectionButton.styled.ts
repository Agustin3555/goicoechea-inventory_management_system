import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

interface SectionButtonStyleProvider {
  hover: {
    transform: string
    fake: {
      boxShadow: string
    }
  }
  fake: {
    color: string
    backgroundColor: string
  }
}

export const sectionButtonStyleAdapter = (
  darkMode: boolean,
  active: boolean
): SectionButtonStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {
    hover: {
      transform: active ? '' : 'scale(1.025)',
      fake: {
        boxShadow: active ? '' : shadowAdapter(2),
      },
    },
    fake: {
      color: colorAdapter(active ? 'g-0' : darkMode ? 'g-4' : 'g-12'),
      backgroundColor: colorAdapter(active ? 'a' : darkMode ? 'g-14' : 'g-0'),
    },
  }
}

export const StylizedSectionButton = styled.div<{ p: SectionButtonStyleProvider }>`
  position: relative;
  transition: transform ${microinteractionAdapter(2)} ease-out;

  .input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;

    :checked {
      cursor: default;
    }
  }

  .fake {
    padding: ${fontSizeAdapter('s')};
    color: ${({ p }) => p.fake.color};
    border-radius: ${notFontSizeAdapter('3xs')};
    background-color: ${({ p }) => p.fake.backgroundColor};
    transition: background-color ${microinteractionAdapter(2)} ease-out,
      box-shadow ${microinteractionAdapter(2)} ease-out;
  }

  :hover {
    transform: ${({ p }) => p.hover.transform};

    .fake {
      box-shadow: ${({ p }) => p.hover.fake.boxShadow};
    }
  }
`
