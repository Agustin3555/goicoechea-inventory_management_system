import styled, { FlattenSimpleInterpolation } from 'styled-components'
import {
  Color,
  colorAdapter,
  Elevation,
  FONT_SIZE,
  FontSize,
  MICROINTERACTION,
  NotFontSize,
  shadowAdapter,
  Value,
} from '@/styles'
import { MAIN_BORDER_RADIUS } from '@/tools'

interface NormalizedProps {
  padding: FontSize
  tight: boolean
  borderRadius: NotFontSize
  backgroundColor: {
    dark: Color
    bright: Color
  }
  elevation: Elevation
}

interface Provider {
  padding: Value
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

export namespace ButtonStyled {
  export interface Props {
    padding?: FontSize
    tight?: boolean
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
      tight: style.tight || false,
      borderRadius: style.borderRadius || MAIN_BORDER_RADIUS,
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
    padding: ${({ p }) => p.padding};
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
      background-color: ${({ p }) => p.active.backgroundColor};
      box-shadow: none;
    }

    :disabled {
      color: initial;
      background-color: default;
      box-shadow: none;
      cursor: default;
    }

    ${({ p }) => p.styled};
  `
}
