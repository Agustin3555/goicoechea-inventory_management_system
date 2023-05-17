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

export interface ConfirmationButtonStyleProps {
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

interface ConfirmationButtonNormalizedStyleProps {
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

interface ConfirmationButtonStyleProvider {
  padding: string
  color: string
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

export const confirmationButtonStyleAdapter = (
  style: ConfirmationButtonStyleProps,
  darkMode: boolean
): ConfirmationButtonStyleProvider => {
  const normalizedProps: ConfirmationButtonNormalizedStyleProps = {
    padding: style.padding || 's',
    tight: style.tight || true,
    borderRadius: style.borderRadius || '3xs',
    color: {
      dark: style?.color?.dark || 'g-4',
      bright: style?.color?.bright || 'g-12',
    },
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
    color: colorAdapter(darkMode ? normalizedProps.color.dark : normalizedProps.color.bright),
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

export const StylizedConfirmationButton = styled.button<{
  p: ConfirmationButtonStyleProvider
}>`
  position: relative;
  padding: ${({ p }) => p.padding};
  color: ${({ p }) => p.color};
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
    color: ${colorAdapter('g-0')};
    background-color: ${({ p }) => p.active.backgroundColor};
    box-shadow: none;

    .loader-container .loader {
      width: 100%;
      height: 100%;
      border-radius: ${({ p }) => p.borderRadius};
      opacity: 1;
      transition: width ${microinteractionAdapter(5)} ease-out,
        height ${microinteractionAdapter(5)} ease-out,
        border-radius ${microinteractionAdapter(5)} ease-out,
        opacity ${microinteractionAdapter(5)} ease-out;
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
      border-radius: ${notFontSizeAdapter('xs')};
      background-color: ${colorAdapter('a')};
      opacity: 0;
      transition: width ${microinteractionAdapter(2)} ease-out,
        height ${microinteractionAdapter(2)} ease-out,
        border-radius ${microinteractionAdapter(2)} ease-out,
        opacity ${microinteractionAdapter(2)} ease-out;
    }
  }

  .content {
    position: relative;
  }

  ${({ p }) => p.styled};
`
