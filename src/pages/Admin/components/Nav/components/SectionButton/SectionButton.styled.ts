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
    fakeButton: {
      boxShadow: string
    }
  }
  fakeButton: {
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
      fakeButton: {
        boxShadow: active ? '' : shadowAdapter(2),
      },
    },
    fakeButton: {
      color: colorAdapter(active ? 'g-0' : darkMode ? 'g-4' : 'g-12'),
      backgroundColor: colorAdapter(active ? 'a' : darkMode ? 'g-14' : 'g-0'),
    },
  }
}

export const StylizedSectionButton = styled.div<{ p: SectionButtonStyleProvider }>`
  position: relative;

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

  .fake-button {
    padding: ${fontSizeAdapter('s')};
    color: ${({ p }) => p.fakeButton.color};
    border-radius: ${notFontSizeAdapter('3xs')};
    background-color: ${({ p }) => p.fakeButton.backgroundColor};
    transition: background-color ${microinteractionAdapter(2)} ease-out,
      box-shadow ${microinteractionAdapter(2)} ease-out;
  }

  :hover .fake-button {
    box-shadow: ${({ p }) => p.hover.fakeButton.boxShadow};
  }
`
