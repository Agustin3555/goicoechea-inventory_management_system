import styled from 'styled-components'
import {
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'
import { GAP, GLASS_BACKGROUND_COLOR, GLASS_BLUR } from '@/tools'

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
    backgroundColor: GLASS_BACKGROUND_COLOR(darkMode),
    boxShadow: shadowAdapter(show ? 3 : 2),
    mediaB: {
      width: show
        ? `calc(
        100% -
          (
            (${GAP} + ${fontSizeAdapter('s')}) * 2 +
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
  padding: ${GAP};
  border-radius: calc(${notFontSizeAdapter('4xs')} + ${GAP});
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: ${({ p }) => p.backgroundColor};
  box-shadow: ${({ p }) => p.boxShadow};
  backdrop-filter: ${GLASS_BLUR};
  transition: right ${microinteractionAdapter(2)} ease-out,
    width ${microinteractionAdapter(2)} ease-out,
    background-color ${microinteractionAdapter(2)} ease-out,
    box-shadow ${microinteractionAdapter(2)} ease-out;

  @media (min-width: 90rem) {
    right: 0;
    top: ${GAP};
    height: calc(100% - ${GAP} * 2);
  }

  @media (max-width: 26.5625rem) {
    width: ${({ p }) => p.mediaB.width};
  }
`
