import styled, { FlattenSimpleInterpolation } from 'styled-components'
import { COLOR, FONT_SIZE, MICROINTERACTION, NOT_FONT_SIZE, shadowAdapter } from '@/styles'

interface Provider {
  styled?: FlattenSimpleInterpolation
}

export namespace SnackbarStyled {
  export interface Props {
    styled?: FlattenSimpleInterpolation
  }

  export const adapter = (style?: Props): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {
      styled: style?.styled,
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    color: ${COLOR.g_0};

    .animation-container {
      display: flex;
      justify-content: center;
      transition: opacity ${MICROINTERACTION.m} ease, transform ${MICROINTERACTION.m} ease-out;

      .message {
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        gap: ${FONT_SIZE.m};
        margin: ${FONT_SIZE.xs};
        padding: ${FONT_SIZE.s};
        border-radius: ${NOT_FONT_SIZE['3xs']};
        box-shadow: ${shadowAdapter(3)};

        .text {
          line-height: calc(${FONT_SIZE.s} * 1.5);
        }

        .close-button {
          align-self: start;
        }
      }
    }

    .fade-enter {
      opacity: 0;
      transform: scale(1.05) translateY(${NOT_FONT_SIZE.xl});
    }

    .fade-exit {
      opacity: 1;
      transform: scale(1) translateY(0);
    }

    .fade-enter-active {
      opacity: 1;
      transform: scale(1) translateY(0);
    }

    .fade-exit-active {
      opacity: 0;
      transform: scale(1.05) translateY(${NOT_FONT_SIZE.xl});
    }

    @media (min-width: 90rem) {
      .animation-container .message {
        max-width: 50%;
      }
    }

    ${({ p }) => p.styled};
  `
}
