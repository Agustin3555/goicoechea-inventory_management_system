import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

interface RightPanelStyleProvider {
  right: string
  backgroundColor: string
  boxShadow: string
  mediaB: {
    width: string
  }
}

export const rightPanelStyleAdapter = (
  darkMode: boolean,
  show: boolean
): RightPanelStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {
    right: show ? '0' : '-200px',
    backgroundColor: colorAdapter(darkMode ? 'g-15' : 'g-2'),
    boxShadow: shadowAdapter(show ? 3 : 2),
    mediaB: {
      width: show
        ? `calc(
        100% -
          (
            (${fontSizeAdapter('xs')} + ${fontSizeAdapter('s')}) * 2 +
              ${fontSizeAdapter('m')}
          )
      )`
        : 'default',
    },
  }
}

export const StylizedRightPanel = styled.div<{ p: RightPanelStyleProvider }>`
  position: absolute;
  top: 0;
  right: ${({ p }) => p.right};
  /* TODO: cambiar luego para que se adapte a su contenido */
  width: 200px;
  height: 100%;
  padding: ${notFontSizeAdapter('2xs')};
  border-radius: calc(${notFontSizeAdapter('4xs')} + ${fontSizeAdapter('xs')});
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: ${({ p }) => p.backgroundColor};
  box-shadow: ${({ p }) => p.boxShadow};
  transition: right ${microinteractionAdapter(2)} ease-out,
    width ${microinteractionAdapter(2)} ease-out,
    background-color ${microinteractionAdapter(2)} ease-out,
    box-shadow ${microinteractionAdapter(2)} ease-out;

  @media (min-width: 90rem) {
    right: 0;
    top: ${fontSizeAdapter('xs')};
    height: calc(100% - ${fontSizeAdapter('xs')} * 2);
  }

  @media (max-width: 26.5625rem) {
    width: ${({ p }) => p.mediaB.width};
  }
`
