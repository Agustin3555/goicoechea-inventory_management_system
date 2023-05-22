import styled from 'styled-components'
import { COLOR, FONT_SIZE, MICROINTERACTION, Value, shadowAdapter } from '@/styles'
import { BRIGHT_2, DARK_2, MAIN_BORDER_RADIUS } from '@/tools'

interface Provider {
  hover: {
    transform: Value
    fakeButton: {
      boxShadow: Value
    }
  }
  fakeButton: {
    color: Value
    backgroundColor: Value
  }
}

export namespace SectionButtonStyled {
  export const adapter = (darkMode: boolean, active: boolean): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {
      hover: {
        transform: active ? '' : 'scale(1.025)',
        fakeButton: {
          boxShadow: shadowAdapter(active ? 0 : 2),
        },
      },
      fakeButton: {
        color: active ? BRIGHT_2 : darkMode ? COLOR.g_4 : COLOR.g_12,
        backgroundColor: active ? COLOR.a : darkMode ? DARK_2 : BRIGHT_2,
      },
    }
  }

  export const Component = styled.div<{ p: Provider }>`
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
      padding: ${FONT_SIZE.s};
      color: ${({ p }) => p.fakeButton.color};
      border-radius: ${MAIN_BORDER_RADIUS};
      background-color: ${({ p }) => p.fakeButton.backgroundColor};
      transition: background-color ${MICROINTERACTION.s} ease-out,
        box-shadow ${MICROINTERACTION.s} ease-out;
    }

    :hover .fake-button {
      box-shadow: ${({ p }) => p.hover.fakeButton.boxShadow};
    }
  `
}
