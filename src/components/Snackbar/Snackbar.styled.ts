import styled, { FlattenSimpleInterpolation } from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

export interface SnackbarStyleProps {
  styled?: FlattenSimpleInterpolation
}

interface SnackbarProvider {
  styled?: FlattenSimpleInterpolation
}

export const snackbarAdapter = (style?: SnackbarStyleProps): SnackbarProvider => {
  // #region Auxiliary vars

  // #endregion

  return {
    styled: style?.styled,
  }
}

export const StylizedSnackbar = styled.div<{ p: SnackbarProvider }>`
  color: ${colorAdapter('g-0')};

  .animation-container {
    display: flex;
    justify-content: center;
    transition: opacity ${microinteractionAdapter(3)} ease,
      transform ${microinteractionAdapter(3)} ease-out;

    .message {
      position: fixed;
      bottom: 0;
      display: flex;
      align-items: center;
      gap: ${fontSizeAdapter('m')};
      margin: ${fontSizeAdapter('xs')};
      padding: ${fontSizeAdapter('s')};
      border-radius: ${notFontSizeAdapter('3xs')};
      box-shadow: ${shadowAdapter(3)};

      .text {
        line-height: calc(${fontSizeAdapter('s')} * 1.5);
      }

      .close-button {
        align-self: start;
      }
    }
  }

  .fade-enter {
    opacity: 0;
    transform: scale(1.05) translateY(${notFontSizeAdapter('xl')});
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
    transform: scale(1.05) translateY(${notFontSizeAdapter('xl')});
  }

  @media (min-width: 90rem) {
    .animation-container .message {
      max-width: 50%;
    }
  }

  ${({ p }) => p.styled};
`
