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
  button: {
    width: string
    height: string
    backgroundColor: string
    iconAContainer: {
      deactivate?: FlattenSimpleInterpolation
    }
    iconBContainer: {
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
    button: {
      width: buttonDimension,
      height: buttonDimension,
      backgroundColor: colorAdapter(darkMode ? buttonColorDark : buttonColorBright),
      iconAContainer: {
        deactivate: darkMode ? undefined : deactivate,
      },
      iconBContainer: {
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

  .checkbox {
    position: absolute;
    z-index: 1;
    inset: 0;
    width: 100%;
    height: 100%;
    appearance: none;
    cursor: pointer;
  }

  .button {
    position: absolute;
    width: ${({ p }) => p.button.width};
    height: ${({ p }) => p.button.height};
    border-radius: ${notFontSizeAdapter('6xl')};
    background-color: ${({ p }) => p.button.backgroundColor};
    transition: background-color ${microinteractionAdapter(2)} ease-out,
      transform ${microinteractionAdapter(1)} ease-out;

    .sun-container,
    .moon-container {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      transition: opacity ${microinteractionAdapter(3)} ease-out,
        transform ${microinteractionAdapter(3)} ease-out;
    }

    .sun-container {
      color: ${colorAdapter('g-4')};
      ${({ p }) => p.button.iconAContainer.deactivate}
    }

    .moon-container {
      color: ${colorAdapter('g-12')};
      ${({ p }) => p.button.iconBContainer.deactivate}
    }
  }

  :active .button {
    transform: scale(87.5%);
  }

  :hover {
    transform: rotate(-22.5deg);
  }
`
