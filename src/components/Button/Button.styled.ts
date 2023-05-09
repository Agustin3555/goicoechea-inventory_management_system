import styled, { FlattenSimpleInterpolation } from 'styled-components'
import {
  Color,
  colorAdapter,
  Elevation,
  FontSize,
  fontSizeAdapter,
  microinteractionAdapter,
  NotFontSize,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

export interface ButtonStyleProps {
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

interface ButtonNormalizedStyleProps {
  padding: FontSize
  tight: boolean
  borderRadius: NotFontSize
  backgroundColor: {
    dark: Color
    bright: Color
  }
  elevation: Elevation
}

interface ButtonStyleProvider {
  padding: string
  borderRadius: string
  backgroundColor: string
  hover: {
    boxShadow: string
  }
  active: {
    backgroundColor: string
  }
  styled?: FlattenSimpleInterpolation
}

export const buttonStyleAdapter = (
  style: ButtonStyleProps,
  darkMode: boolean
): ButtonStyleProvider => {
  const normalizedProps: ButtonNormalizedStyleProps = {
    padding: style.padding || 's',
    tight: style.tight || false,
    borderRadius: style.borderRadius || '3xs',
    backgroundColor: {
      dark: style.backgroundColor.dark,
      bright: style.backgroundColor.bright || style.backgroundColor.dark,
    },
    elevation: style.elevation || 2,
  }

  // #region Auxiliary vars

  const paddingTopBottom = fontSizeAdapter(normalizedProps.padding)

  // #endregion

  return {
    padding: `${paddingTopBottom} ${
      normalizedProps.tight ? '' : `calc(${paddingTopBottom} * 2)`
    }`,
    borderRadius: notFontSizeAdapter(normalizedProps.borderRadius),
    backgroundColor: colorAdapter(
      darkMode ? normalizedProps.backgroundColor.dark : normalizedProps.backgroundColor.bright
    ),
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

export const StylizedButton = styled.button<{ p: ButtonStyleProvider }>`
  padding: ${({ p }) => p.padding};
  border: none;
  border-radius: ${({ p }) => p.borderRadius};
  background-color: ${({ p }) => p.backgroundColor};
  cursor: pointer;
  transition: background-color ${microinteractionAdapter(2)} ease-out,
    box-shadow ${microinteractionAdapter(2)} ease-out;

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
