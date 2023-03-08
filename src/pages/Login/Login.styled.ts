import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
} from '@/styles'

interface LoginStyleProvider {
  content: {
    authError: {
      color: string
    }
  }
}

export const loginStyleAdapter = (darkMode: boolean): LoginStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {
    content: {
      authError: {
        color: colorAdapter(darkMode ? 'g-0' : 'g-12'),
      },
    },
  }
}

export const StylizedLogin = styled.div<{ p: LoginStyleProvider }>`
  width: 100%;
  height: 100%;

  .content {
    display: flex;
    flex-direction: column;
    gap: ${notFontSizeAdapter('m')};

    .fields {
      display: flex;
      flex-direction: column;
      gap: ${fontSizeAdapter('s')};
    }

    .auth-error-container {
      display: flex;
      justify-content: center;

      .auth-error {
        font-size: ${fontSizeAdapter('xs')};
        color: ${colorAdapter('a')};
        transition: height ${microinteractionAdapter(3)} ease-in-out,
          opacity ${microinteractionAdapter(3)} ease-in-out;
      }

      .auth-error[data-show='false'] {
        height: 0;
        opacity: 0;
      }

      .auth-error[data-show='true'] {
        height: ${fontSizeAdapter('xs')};
        opacity: 1;
      }
    }

    .button-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: ${fontSizeAdapter('s')};
      height: ${fontSizeAdapter('s')};
      color: ${colorAdapter('g-0')};
      transition: opacity ${microinteractionAdapter(2)} ease-in-out;
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
