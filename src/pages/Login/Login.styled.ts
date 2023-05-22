import styled from 'styled-components'
import { COLOR, FONT_SIZE, MICROINTERACTION, NOT_FONT_SIZE, Value } from '@/styles'

interface Provider {
  content: {
    authError: {
      color: Value
    }
  }
}

export namespace LoginStyled {
  export const adapter = (darkMode: boolean): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {
      content: {
        authError: {
          color: darkMode ? COLOR.g_0 : COLOR.g_12,
        },
      },
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    width: 100%;
    height: 100%;

    .content {
      display: flex;
      flex-direction: column;
      gap: ${NOT_FONT_SIZE.m};

      .fields {
        display: flex;
        flex-direction: column;
        gap: ${FONT_SIZE.s};
      }

      .auth-error-container {
        display: flex;
        justify-content: center;

        .auth-error {
          color: ${COLOR.a};
          transition: height ${MICROINTERACTION.m} ease-in-out,
            opacity ${MICROINTERACTION.m} ease-in-out;
        }

        .auth-error[data-show='false'] {
          height: 0;
          opacity: 0;
        }

        .auth-error[data-show='true'] {
          height: ${FONT_SIZE.xs};
          opacity: 1;
        }
      }

      .button-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${FONT_SIZE.s};
        height: ${FONT_SIZE.s};
        color: ${COLOR.g_0};
        transition: opacity ${MICROINTERACTION.s} ease-in-out;
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
    }
  `
}
