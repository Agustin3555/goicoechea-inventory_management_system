import styled, { FlattenSimpleInterpolation } from 'styled-components'
import {
  COLOR,
  Color,
  FONT_SIZE,
  FontSize,
  MICROINTERACTION,
  NotFontSize,
  shadowAdapter,
  Value,
} from '@/styles'
import { BRIGHT_2, DARK_2, MAIN_BORDER_RADIUS, MAIN_GAP } from '@/tools'

interface Provider {
  input: {
    checked: {
      fakeInput: {
        backgroundColor: Value
      }
    }
  }
  fakeInput: {
    padding: Value
    color: Value
    borderRadius: Value
    backgroundColor: Value
    text: {
      fontSize: Value
      lineHeight: Value
    }
  }
  styled?: FlattenSimpleInterpolation
}

export namespace CheckboxButtonStyled {
  export interface Props {
    fontSize?: FontSize
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
      borderRadius = MAIN_BORDER_RADIUS,
      color,
      primaryBackgroundColor = {
        dark: DARK_2,
        bright: BRIGHT_2,
      },
      secondaryBackgroundColor = COLOR.a,
      styled,
    }: Props,
    darkMode: boolean
  ): Provider => {
    return {
      input: {
        checked: {
          fakeInput: {
            backgroundColor: secondaryBackgroundColor,
          },
        },
      },
      fakeInput: {
        padding: fontSize,
        color: color ? (darkMode ? color.dark : color.bright) : '',
        borderRadius,
        backgroundColor: darkMode
          ? primaryBackgroundColor.dark
          : primaryBackgroundColor.bright,
        text: {
          fontSize: fontSize === FONT_SIZE['2xs'] ? FONT_SIZE.xs : fontSize,
          lineHeight: fontSize,
        },
      },
      styled,
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    position: relative;

    :hover .fake-input {
      box-shadow: ${shadowAdapter(2)};
    }

    .input {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;

      :checked + .fake-input {
        color: ${COLOR.g_0};
        background-color: ${({ p }) => p.input.checked.fakeInput.backgroundColor};
      }
    }

    .fake-input {
      display: flex;
      align-items: center;
      padding: ${({ p }) => p.fakeInput.padding};
      color: ${({ p }) => p.fakeInput.color};
      border-radius: ${({ p }) => p.fakeInput.borderRadius};
      background-color: ${({ p }) => p.fakeInput.backgroundColor};
      overflow: hidden;
      transition: color ${MICROINTERACTION.s} ease-out,
        background-color ${MICROINTERACTION.s} ease-out,
        box-shadow ${MICROINTERACTION.s} ease-out;

      .text {
        font-size: ${({ p }) => p.fakeInput.text.fontSize};
        line-height: ${({ p }) => p.fakeInput.text.lineHeight};
      }
    }
  `
}
