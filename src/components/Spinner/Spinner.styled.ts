import styled from 'styled-components'
import { COLOR, Color, FONT_SIZE, NOT_FONT_SIZE, Value, colorAdapter } from '@/styles'

interface NormalizedProps {
  semicircleBackgroundColor: {
    dark: Color
    bright: Color
  }
  lineBackgroundColor: {
    dark: Color
    bright: Color
  }
}

interface Provider {
  before: {
    backgroundColor: Value
  }
  after: {
    backgroundColor: Value
  }
}

export namespace SpinnerStyled {
  export interface Props {
    semicircleBackgroundColor?: {
      dark?: Color
      bright?: Color
    }
    lineBackgroundColor?: {
      dark?: Color
      bright?: Color
    }
  }

  export const adapter = (darkMode: boolean, style?: Props): Provider => {
    const normalizedProps: NormalizedProps = {
      semicircleBackgroundColor: {
        dark: style?.semicircleBackgroundColor?.dark || COLOR.g_0,
        bright: style?.semicircleBackgroundColor?.bright || COLOR.g_0,
      },
      lineBackgroundColor: {
        dark: style?.lineBackgroundColor?.dark || COLOR.g_14,
        bright: style?.lineBackgroundColor?.bright || COLOR.g_14,
      },
    }

    // #region Auxiliary vars

    // #endregion

    return {
      before: {
        backgroundColor: colorAdapter(
          darkMode
            ? normalizedProps.semicircleBackgroundColor.dark
            : normalizedProps.semicircleBackgroundColor.bright
        ),
      },
      after: {
        backgroundColor: colorAdapter(
          darkMode
            ? normalizedProps.lineBackgroundColor.dark
            : normalizedProps.lineBackgroundColor.bright
        ),
      },
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    width: ${FONT_SIZE.s};
    height: ${FONT_SIZE.s};
    animation: rotate 1.6s ease-in infinite alternate;

    ::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: ${FONT_SIZE.s};
      height: calc(${FONT_SIZE.s} * 0.5);
      background-color: ${({ p }) => p.before.backgroundColor};
      border-radius: 0 0 ${NOT_FONT_SIZE['6xl']} ${NOT_FONT_SIZE['6xl']};
    }

    ::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 10%;
      width: ${NOT_FONT_SIZE['5xs']};
      height: ${FONT_SIZE.s};
      border-radius: ${NOT_FONT_SIZE['6xl']};
      background-color: ${({ p }) => p.after.backgroundColor};
      animation: rotate 1.3s linear infinite alternate-reverse;
    }

    @keyframes rotate {
      to {
        transform: rotate(360deg);
      }
    }
  `
}
