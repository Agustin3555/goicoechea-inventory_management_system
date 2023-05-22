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

interface NormalizedProps {
  padding: FontSize
  tight: boolean
  color: {
    dark: Color
    bright: Color
  }
  borderRadius: NotFontSize
  backgroundColor: {
    dark: Color
    bright: Color
  }
  elevation: Elevation
}

interface Provider {
  padding: Value
  color: Value
  borderRadius: Value
  backgroundColor: Value
  hover: {
    boxShadow: Value
  }
  active: {
    backgroundColor: Value
  }
  styled?: FlattenSimpleInterpolation
}

export namespace ConfirmationButtonStyled {
  export interface Props {
    padding?: FontSize
    tight?: boolean
    color?: {
      dark?: Color
      bright?: Color
    }
    borderRadius?: NotFontSize
    backgroundColor: {
      dark: Color
      bright?: Color
    }
    elevation?: Elevation
    styled?: FlattenSimpleInterpolation
  }

  export const adapter = (style: Props, darkMode: boolean): Provider => {
    const normalizedProps: NormalizedProps = {
      padding: style.padding || FONT_SIZE.s,
      tight: style.tight || true,
      borderRadius: style.borderRadius || NOT_FONT_SIZE['3xs'],
      color: {
        dark: style?.color?.dark || COLOR.g_4,
        bright: style?.color?.bright || COLOR.g_12,
      },
      backgroundColor: {
        dark: style.backgroundColor.dark,
        bright: style.backgroundColor.bright || style.backgroundColor.dark,
      },
      elevation: style.elevation || 2,
    }

    // #region Auxiliary vars

    const paddingTopBottom = normalizedProps.padding

    // #endregion

    return {
      padding: `${paddingTopBottom} ${
        normalizedProps.tight ? '' : `calc(${paddingTopBottom} * 2)`
      }`,
      color: darkMode ? normalizedProps.color.dark : normalizedProps.color.bright,
      borderRadius: normalizedProps.borderRadius,
      backgroundColor: darkMode
        ? normalizedProps.backgroundColor.dark
        : normalizedProps.backgroundColor.bright,
      hover: {
        boxShadow: shadowAdapter(normalizedProps.elevation),
      },
      active: {
        backgroundColor: colorAdapter(
          darkMode
            ? normalizedProps.backgroundColor.dark
            : normalizedProps.backgroundColor.bright,
          1
        ),
      },
      styled: style?.styled,
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
    transition: background-color ${MICROINTERACTION.s} ease-out,
      box-shadow ${MICROINTERACTION.s} ease-out;

    :hover {
      box-shadow: ${({ p }) => p.hover.boxShadow};
    }

    :active {
      color: ${COLOR.g_0};
      background-color: ${({ p }) => p.active.backgroundColor};
      box-shadow: none;

      .loader-container .loader {
        width: 100%;
        height: 100%;
        border-radius: ${({ p }) => p.borderRadius};
        opacity: 1;
        transition: width ${MICROINTERACTION.xl} ease-out,
          height ${MICROINTERACTION.xl} ease-out, border-radius ${MICROINTERACTION.xl} ease-out,
          opacity ${MICROINTERACTION.xl} ease-out;
      }
    }

    :disabled {
      color: initial;
      background-color: default;
      box-shadow: none;
      cursor: default;
    }

    .loader-container {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      .loader {
        width: 0;
        height: 0;
        border-radius: ${NOT_FONT_SIZE.xs};
        background-color: ${COLOR.a};
        opacity: 0;
        transition: width ${MICROINTERACTION.s} ease-out, height ${MICROINTERACTION.s} ease-out,
          border-radius ${MICROINTERACTION.s} ease-out, opacity ${MICROINTERACTION.s} ease-out;
      }
    }

    .content {
      position: relative;
    }

    ${({ p }) => p.styled};
  `
}
