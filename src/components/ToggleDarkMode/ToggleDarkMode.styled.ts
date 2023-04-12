import {
  Color,
  colorAdapter,
  degAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
} from '@/styles'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

interface ToggleDarkModeStyleProvider {
  width: string
  height: string
  padding: string
  backgroundColor: string
  fakeButton: {
    width: string
    height: string
    backgroundColor: string
    sun: {
      deactivate?: FlattenSimpleInterpolation
    }
    moon: {
      deactivate?: FlattenSimpleInterpolation
    }
  }
}

export const toggleDarkModeStyleAdapter = (darkMode: boolean): ToggleDarkModeStyleProvider => {
  // #region Auxiliary vars

  const dimension = `calc(${fontSizeAdapter('s')} * 2 + ${fontSizeAdapter('m')})`
  const padding = notFontSizeAdapter('5xs')
  const buttonDimension = `calc(${dimension} - ${padding} * 2)`
  const buttonColorDark: Color = 'g-15'
  const buttonColorBright: Color = 'g-2'

  const deactivate = css`
    opacity: 0;
    transform: scale(0) rotate(-${degAdapter(135)});
  `

  // #endregion

  return {
    width: dimension,
    height: dimension,
    padding,
    backgroundColor: darkMode
      ? colorAdapter(buttonColorDark, -2)
      : colorAdapter(buttonColorBright, -6),
    fakeButton: {
      width: buttonDimension,
      height: buttonDimension,
      backgroundColor: colorAdapter(darkMode ? buttonColorDark : buttonColorBright),
      sun: {
        deactivate: darkMode ? undefined : deactivate,
      },
      moon: {
        deactivate: darkMode ? deactivate : undefined,
      },
    },
  }
}

export const StylizedToggleDarkMode = styled.div<{ p: ToggleDarkModeStyleProvider }>`
  position: relative;
  width: ${({ p }) => p.width};
  height: ${({ p }) => p.height};
  padding: ${({ p }) => p.padding};
  border-radius: ${notFontSizeAdapter('6xl')};
  background-color: ${({ p }) => p.backgroundColor};
  overflow: hidden;
  transition: background-color ${microinteractionAdapter(2)} ease-out,
    transform ${microinteractionAdapter(3)} ease-out;

  .input {
    position: absolute;
    width: 100%;
    height: 100%;
    appearance: none;
    cursor: pointer;
  }

  .fake-button {
    position: absolute;
    width: ${({ p }) => p.fakeButton.width};
    height: ${({ p }) => p.fakeButton.height};
    border-radius: ${notFontSizeAdapter('6xl')};
    background-color: ${({ p }) => p.fakeButton.backgroundColor};
    transition: background-color ${microinteractionAdapter(2)} ease-out,
      transform ${microinteractionAdapter(1)} ease-out;

    .sun,
    .moon {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      transition: opacity ${microinteractionAdapter(3)} ease-out,
        transform ${microinteractionAdapter(3)} ease-out;
    }

    .sun {
      color: ${colorAdapter('g-4')};
      ${({ p }) => p.fakeButton.sun.deactivate}
    }

    .moon {
      color: ${colorAdapter('g-12')};
      ${({ p }) => p.fakeButton.moon.deactivate}
    }
  }

  :hover {
    transform: rotate(-22.5deg);
  }

  :active .fake-button {
    transform: scale(87.5%);
  }
`
