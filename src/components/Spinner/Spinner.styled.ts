import styled from 'styled-components'
import {
  Color,
  colorAdapter,
  fontSizeAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

export interface SpinnerStyleProps {
  semicircleBackgroundColor?: {
    dark?: Color
    bright?: Color
  }
  lineBackgroundColor?: {
    dark?: Color
    bright?: Color
  }
}

interface SpinnerNormalizedStyleProps {
  semicircleBackgroundColor: {
    dark: Color
    bright: Color
  }
  lineBackgroundColor: {
    dark: Color
    bright: Color
  }
}

interface SpinnerStyleProvider {
  before: {
    backgroundColor: string
  }
  after: {
    backgroundColor: string
  }
}

export const spinnerStyleAdapter = (
  darkMode: boolean,
  style?: SpinnerStyleProps
): SpinnerStyleProvider => {
  const normalizedProps: SpinnerNormalizedStyleProps = {
    semicircleBackgroundColor: {
      dark: style?.semicircleBackgroundColor?.dark || 'g-0',
      bright: style?.semicircleBackgroundColor?.bright || 'g-0',
    },
    lineBackgroundColor: {
      dark: style?.lineBackgroundColor?.dark || 'g-14',
      bright: style?.lineBackgroundColor?.bright || 'g-14',
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

export const StylizedSpinner = styled.div<{ p: SpinnerStyleProvider }>`
  width: ${fontSizeAdapter('s')};
  height: ${fontSizeAdapter('s')};
  animation: rotate 1.6s ease-in infinite alternate;

  ::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${fontSizeAdapter('s')};
    height: calc(${fontSizeAdapter('s')} * 0.5);
    background-color: ${({ p }) => p.before.backgroundColor};
    border-radius: 0 0 ${notFontSizeAdapter('6xl')} ${notFontSizeAdapter('6xl')};
  }

  ::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 10%;
    width: ${notFontSizeAdapter('5xs')};
    height: ${fontSizeAdapter('s')};
    border-radius: ${notFontSizeAdapter('6xl')};
    background-color: ${({ p }) => p.after.backgroundColor};
    animation: rotate 1.3s linear infinite alternate-reverse;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`
