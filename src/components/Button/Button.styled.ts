import styled from 'styled-components'
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

type ButtonWidthProp = 'expanded' | NotFontSize

export interface ButtonStyleProps {
  width?: ButtonWidthProp
  padding?: FontSize
  tight?: boolean
  borderRadius?: NotFontSize
  backgroundColor: {
    dark: Color
    bright?: Color
  }
  elevation?: Elevation
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
  width: string
  padding: string
  borderRadius: string
  backgroundColor: string
  hover: {
    boxShadow: string
  }
  active: {
    backgroundColor: string
  }
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
    width: '',
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
  }
}

export const StylizedButton = styled.button<{ p: ButtonStyleProvider }>`
  width: ${({ p }) => p.width};
  padding: ${({ p }) => p.padding};
  border: none;
  border-radius: ${({ p }) => p.borderRadius};
  background-color: ${({ p }) => p.backgroundColor};
  cursor: pointer;
  transition: background-color ${microinteractionAdapter(2)} ease-out,
    box-shadow ${microinteractionAdapter(2)} ease-out,
    transform ${microinteractionAdapter(2)} ease-out;

  :hover {
    box-shadow: ${({ p }) => p.hover.boxShadow};
    transform: scale(1.0125);
  }

  :active {
    background-color: ${({ p }) => p.active.backgroundColor};
    box-shadow: none;
    transform: scale(1);
  }

  :disabled {
    color: initial;
    background-color: default;
    box-shadow: none;
    cursor: default;
    transform: scale(1);
  }
`
