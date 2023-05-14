import styled from 'styled-components'
import {
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'
import { GAP, GLASS_BACKGROUND_COLOR, GLASS_BLUR } from '@/tools'

interface NavStyleProvider {
  left: string
  backgroundColor: string
  boxShadow: string
}

export const navStyleAdapter = (darkMode: boolean, show: boolean): NavStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {
    left: show
      ? '0'
      : `calc((${GAP} * 3 + ${fontSizeAdapter('s')} * 2 + ${fontSizeAdapter('m')}) * -1)`,
    backgroundColor: GLASS_BACKGROUND_COLOR(darkMode),
    boxShadow: shadowAdapter(show ? 3 : 2),
  }
}

export const StylizedNav = styled.div<{ p: NavStyleProvider }>`
  position: absolute;
  top: 0;
  left: ${({ p }) => p.left};
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: ${GAP};
  border-radius: calc(${notFontSizeAdapter('4xs')} + ${GAP});
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: ${({ p }) => p.backgroundColor};
  box-shadow: ${({ p }) => p.boxShadow};
  backdrop-filter: ${GLASS_BLUR};
  transition: inset ${microinteractionAdapter(2)} ease-out,
    background-color ${microinteractionAdapter(2)} ease-out,
    box-shadow ${microinteractionAdapter(2)} ease-out;

  .items {
    display: flex;
    flex-direction: column;
    gap: ${GAP};
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    gap: ${GAP};
  }

  @media (min-width: 90rem) {
    left: 0;
    top: ${GAP};
    height: calc(100% - ${GAP} * 2);
  }
`
