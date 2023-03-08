import styled from 'styled-components'
import { colorAdapter, fontSizeAdapter, notFontSizeAdapter, shadowAdapter } from '@/styles'

interface SpinnerStyleProvider {}

export const spinnerStyleAdapter = (darkMode: boolean): SpinnerStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {}
}

export const StylizedSpinner = styled.div<{ p?: SpinnerStyleProvider }>`
  position: relative;
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
    background-color: ${colorAdapter('g-0')};
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
    background-color: ${colorAdapter('g-14')};
    animation: rotate 1.3s linear infinite alternate-reverse;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`
