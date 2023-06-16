import styled, { FlattenSimpleInterpolation } from 'styled-components'
import {
  COLOR,
  Color,
  colorAdapter,
  Elevation,
  FONT_SIZE,
  FontSize,
  MICROINTERACTION,
  NOT_FONT_SIZE,
  NotFontSize,
  shadowAdapter,
  Value,
} from '@/styles'
import { BRIGHT_2, DARK_2, MAIN_BORDER_RADIUS, MAIN_GAP } from '@/tools'
import { STATUS } from './ConfirmationButton'

interface Provider {
  fontSize: Value
  lineHeight: Value
  padding: Value
  color: Value
  borderRadius: Value
  backgroundColor: Value
  confirmationButtonAC: {
    gap: Value
  }
  loaderC: {
    loader: {
      width: Value
      height: Value
      borderRadius: Value
      backgroundColor: Value
      opacity: Value
    }
  }
  styled?: FlattenSimpleInterpolation
}

export namespace ConfirmationButtonStyled {
  export interface Props {
    fontSize?: FontSize
    tight?: boolean
    borderRadius?: NotFontSize
    color?: {
      dark: Color
      bright: Color
    }
    primaryBackgroundColor?: {
      dark: Color
      bright: Color
    }
    secondaryBackgroundColor?: Color
    styled?: FlattenSimpleInterpolation
  }

  export const adapter = (
    {
      fontSize = MAIN_GAP,
      tight = false,
      borderRadius = MAIN_BORDER_RADIUS,
      color,
      primaryBackgroundColor = {
        dark: DARK_2,
        bright: BRIGHT_2,
      },
      secondaryBackgroundColor = COLOR.a,
      styled,
    }: Props,
    darkMode: boolean,
    status: STATUS
  ): Provider => {
    // #region Auxiliary vars

    const paddingTopBottom = fontSize

    // #endregion

    return {
      padding: `${paddingTopBottom} ${tight ? '' : `calc(${paddingTopBottom} * 2)`}`,
      fontSize: fontSize === FONT_SIZE['2xs'] ? FONT_SIZE.xs : fontSize,
      lineHeight: fontSize,
      color:
        status !== STATUS.init
          ? COLOR.g_0
          : color
          ? darkMode
            ? color.dark
            : color.bright
          : '',
      borderRadius,
      backgroundColor: darkMode
        ? primaryBackgroundColor.dark
        : primaryBackgroundColor.bright,
      styled,
      confirmationButtonAC: {
        gap: `calc(${fontSize} * 0.75)`,
      },
      loaderC: {
        loader: {
          width: status === STATUS.init ? 0 : '100%',
          height: status === STATUS.init ? 0 : '100%',
          borderRadius: status === STATUS.init ? NOT_FONT_SIZE.xl : borderRadius,
          backgroundColor: secondaryBackgroundColor,
          opacity: status === STATUS.init ? 0 : 1,
        },
      },
    }
  }

  export const Component = styled.button<{ p: Provider }>`
    position: relative;
    padding: ${({ p }) => p.padding};
    color: ${({ p }) => p.color};
    border: none;
    border-radius: ${({ p }) => p.borderRadius};
    background-color: ${({ p }) => p.backgroundColor};
    cursor: pointer;
    transition: color ${MICROINTERACTION.s} ${MICROINTERACTION.s} ease-out,
      background-color ${MICROINTERACTION.s} ease-out,
      box-shadow ${MICROINTERACTION.s} ease-out;

    transition :hover {
      box-shadow: ${shadowAdapter(2)};
    }

    :active {
      box-shadow: none;

      .loader-C .loader {
        width: 100%;
        height: 100%;
        border-radius: ${({ p }) => p.borderRadius};
        opacity: 1;
        transition: width ${MICROINTERACTION.xl} ease-out,
          height ${MICROINTERACTION.xl} ease-out,
          border-radius ${MICROINTERACTION.xl} ease-out,
          opacity ${MICROINTERACTION.xl} ease-out;
      }
    }

    .loader-C {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      .loader {
        width: ${({ p }) => p.loaderC.loader.width};
        height: ${({ p }) => p.loaderC.loader.height};
        border-radius: ${({ p }) => p.loaderC.loader.borderRadius};
        background-color: ${({ p }) => p.loaderC.loader.backgroundColor};
        opacity: ${({ p }) => p.loaderC.loader.opacity};
        transition: width ${MICROINTERACTION.s} ease-out,
          height ${MICROINTERACTION.s} ease-out,
          border-radius ${MICROINTERACTION.s} ease-out,
          opacity ${MICROINTERACTION.s} ease-out;
      }
    }

    .confirmation-button-AC {
      display: flex;
      justify-content: center;
      gap: ${({ p }) => p.confirmationButtonAC.gap};
      transition: opacity ${MICROINTERACTION.m} ease-out;

      .text {
        font-size: ${({ p }) => p.fontSize};
        line-height: ${({ p }) => p.lineHeight};
      }
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

    ${({ p }) => p.styled};
  `
}
