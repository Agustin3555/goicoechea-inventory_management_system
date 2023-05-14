import styled from 'styled-components'
import {
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'
import { GAP, GLASS_BACKGROUND_COLOR, GLASS_BLUR } from '@/tools'

interface MainStyleProvider {
  padding: string
  backgroundColor: string
}

export const mainStyleAdapter = (darkMode: boolean): MainStyleProvider => {
  // #region Auxiliary vars

  const paddingTopBottom = GAP
  const paddingLeft = `calc(${GAP} * 3 + ${fontSizeAdapter('s')} * 2 + ${fontSizeAdapter(
    'm'
  )})`
  const paddingRight = `calc(${GAP} + 200px)`

  // #endregion

  return {
    padding: `${paddingTopBottom} ${paddingRight} ${paddingTopBottom} ${paddingLeft}`,
    backgroundColor: GLASS_BACKGROUND_COLOR(darkMode),
  }
}

export const StylizedMain = styled.div<{ p: MainStyleProvider }>`
  height: 100%;
  padding: ${({ p }) => p.padding};
  transition: padding ${microinteractionAdapter(2)} ease-out;

  .container {
    height: 100%;
    padding: ${GAP};
    border-radius: calc(${notFontSizeAdapter('4xs')} + ${GAP});
    background-color: ${({ p }) => p.backgroundColor};
    box-shadow: ${shadowAdapter(2)};
    backdrop-filter: ${GLASS_BLUR};
    transition: border-radius ${microinteractionAdapter(2)} ease-out,
      background-color ${microinteractionAdapter(2)} ease-out;

    .animation-container {
      height: 100%;
      transition: opacity ${microinteractionAdapter(1)} ease-out;
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

  @media (max-width: 89.9375rem) {
    padding-right: ${GAP};
    padding-left: ${GAP};
  }

  @media (max-width: 26.5625rem) {
    padding: 0;

    .container {
      border-radius: 0;
    }
  }
`
