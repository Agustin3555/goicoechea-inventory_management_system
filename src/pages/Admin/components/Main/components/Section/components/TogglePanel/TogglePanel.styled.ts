import { COLOR, FONT_SIZE, MICROINTERACTION, Value } from '@/styles'
import styled from 'styled-components'

interface Provider {
  buttonContent: {
    color: Value
  }
}

export namespace TogglePanelStyled {
  export const adapter = (darkMode: boolean): Provider => {
    // #region Auxiliary vars

    return {
      buttonContent: {
        color: darkMode ? COLOR.g_4 : COLOR.g_12,
      },
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    .button-content {
      display: flex;
      gap: ${FONT_SIZE.xs};
      color: ${({ p }) => p.buttonContent.color};
      transition: color ${MICROINTERACTION.s} ease-out;
    }

    @media (max-width: 48rem) {
      .button-content {
        .text {
          display: none;
        }
      }
    }

    @media (min-width: 90rem) {
      display: none;
    }
  `
}
