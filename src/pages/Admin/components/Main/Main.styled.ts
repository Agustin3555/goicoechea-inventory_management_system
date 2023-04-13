import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

interface MainStyleProvider {
  padding: string
  backgroundColor: string
}

export const mainStyleAdapter = (darkMode: boolean): MainStyleProvider => {
  // #region Auxiliary vars

  const paddingTopBottom = fontSizeAdapter('xs')
  const paddingLeft = `calc(${fontSizeAdapter('xs')} * 3 + ${fontSizeAdapter(
    's'
  )} * 2 + ${fontSizeAdapter('m')})`
  const paddingRight = `calc(${fontSizeAdapter('xs')} + 200px)`

  // #endregion

  return {
    padding: `${paddingTopBottom} ${paddingRight} ${paddingTopBottom} ${paddingLeft}`,
    backgroundColor: colorAdapter(darkMode ? 'g-15' : 'g-2'),
  }
}

export const StylizedMain = styled.div<{ p: MainStyleProvider }>`
  height: 100%;
  padding: ${({ p }) => p.padding};
  transition: padding ${microinteractionAdapter(2)} ease-out;

  .container {
    height: 100%;
    padding: ${fontSizeAdapter('xs')};
    border-radius: calc(${notFontSizeAdapter('4xs')} + ${fontSizeAdapter('xs')});
    background-color: ${({ p }) => p.backgroundColor};
    box-shadow: ${shadowAdapter(2)};
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
    padding-right: ${fontSizeAdapter('xs')};
    padding-left: ${fontSizeAdapter('xs')};
  }

  @media (max-width: 26.5625rem) {
    padding: 0;

    .container {
      border-radius: 0;
    }
  }
`
