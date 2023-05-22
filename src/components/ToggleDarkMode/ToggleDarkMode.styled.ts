import {
  COLOR,
  FONT_SIZE,
  MICROINTERACTION,
  NOT_FONT_SIZE,
  Value,
  colorAdapter,
} from '@/styles'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

interface Provider {
  width: Value
  height: Value
  padding: Value
  backgroundColor: Value
  fakeButton: {
    width: Value
    height: Value
    backgroundColor: Value
    sun: {
      deactivate?: FlattenSimpleInterpolation
    }
    moon: {
      deactivate?: FlattenSimpleInterpolation
    }
  }
}

const dimension = `calc(${FONT_SIZE.s} * 2 + ${FONT_SIZE.m})`
const padding = NOT_FONT_SIZE['5xs']
const buttonDimension = `calc(${dimension} - ${padding} * 2)`
const buttonColorDark = COLOR.g_15
const buttonColorBright = COLOR.g_2
const deactivate = css`
  opacity: 0;
  transform: scale(0) rotate(135deg);
`

export namespace ToggleDarkModeStyled {
  export const adapter = (darkMode: boolean): Provider => {
    // #region Auxiliary vars

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
        backgroundColor: darkMode ? buttonColorDark : buttonColorBright,
        sun: {
          deactivate: darkMode ? undefined : deactivate,
        },
        moon: {
          deactivate: darkMode ? deactivate : undefined,
        },
      },
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    position: relative;
    width: ${({ p }) => p.width};
    height: ${({ p }) => p.height};
    padding: ${({ p }) => p.padding};
    border-radius: ${NOT_FONT_SIZE['6xl']};
    background-color: ${({ p }) => p.backgroundColor};
    overflow: hidden;
    transition: background-color ${MICROINTERACTION.s} ease-out,
      transform ${MICROINTERACTION.m} ease-out;

    :hover {
      transform: rotate(-22.5deg);
    }

    :active .fake-button {
      transform: scale(87.5%);
    }

    .fake-button {
      position: absolute;
      width: ${({ p }) => p.fakeButton.width};
      height: ${({ p }) => p.fakeButton.height};
      border-radius: ${NOT_FONT_SIZE['6xl']};
      background-color: ${({ p }) => p.fakeButton.backgroundColor};
      transition: background-color ${MICROINTERACTION.s} ease-out,
        transform ${MICROINTERACTION.xs} ease-out;

      .sun,
      .moon {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        transition: opacity ${MICROINTERACTION.m} ease-out,
          transform ${MICROINTERACTION.m} ease-out;
      }

      .sun {
        color: ${COLOR.g_4};
        ${({ p }) => p.fakeButton.sun.deactivate}
      }

      .moon {
        color: ${COLOR.g_12};
        ${({ p }) => p.fakeButton.moon.deactivate}
      }
    }

    .input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      appearance: none;
      cursor: pointer;
    }
  `
}
