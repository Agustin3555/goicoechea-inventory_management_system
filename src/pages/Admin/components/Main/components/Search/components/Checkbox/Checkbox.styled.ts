import styled, { FlattenSimpleInterpolation } from 'styled-components'
import {
  COLOR,
  Color,
  FONT_SIZE,
  MICROINTERACTION,
  NOT_FONT_SIZE,
  Value,
  colorAlphaAdapter,
  shadowAdapter,
} from '@/styles'

interface NormalizedProps {
  color: {
    dark: Color
    bright: Color
  }
  backgroundColor: {
    dark: Color
    bright: Color
  }
}

interface Provider {
  fakeInput: {
    gap: Value
    padding: Value
    paddingRight: Value
    backgroundColor: Value
    text: {
      color: Value
    }
  }
  styled?: FlattenSimpleInterpolation
}

export namespace CheckboxStyled {
  export interface Props {
    color?: {
      dark?: Color
      bright?: Color
    }
    backgroundColor?: {
      dark?: Color
      bright?: Color
    }
    styled?: FlattenSimpleInterpolation
  }

  export const adapter = (darkMode: boolean, style?: Props): Provider => {
    const normalizedProps: NormalizedProps = {
      color: {
        dark: style?.color?.dark || COLOR.g_4,
        bright: style?.color?.bright || COLOR.g_12,
      },
      backgroundColor: {
        dark: style?.backgroundColor?.dark || COLOR.g_14,
        bright: style?.backgroundColor?.bright || COLOR.g_0,
      },
    }

    // #region Auxiliary vars

    const checkboxDimension = FONT_SIZE.m
    const fontSize = FONT_SIZE['2xs']
    const internalDif = `calc((${checkboxDimension} - ${fontSize}) * 0.5)`
    const padding = `calc(${fontSize} - ${internalDif})`
    const gap = `calc(${internalDif} + ${padding})`

    // #endregion

    return {
      fakeInput: {
        gap,
        padding,
        paddingRight: gap,
        backgroundColor: darkMode
          ? normalizedProps.backgroundColor.dark
          : normalizedProps.backgroundColor.bright,
        text: {
          color: darkMode ? normalizedProps.color.dark : normalizedProps.color.bright,
        },
      },
      styled: style?.styled,
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
        background-color: ${COLOR.a};

        .checkbox {
          background-color: ${COLOR.g_0};
          // TODO: test
          border-color: ${colorAlphaAdapter(COLOR.a, 0)};

          .icon-container {
            opacity: 1;
            transform: initial;
          }
        }

        .text {
          color: ${COLOR.g_0};
        }
      }
    }

    .fake-input {
      display: flex;
      align-items: center;
      gap: ${({ p }) => p.fakeInput.gap};
      padding: ${({ p }) => p.fakeInput.padding};
      padding-right: ${({ p }) => p.fakeInput.paddingRight};
      border-radius: ${NOT_FONT_SIZE['4xs']};
      background-color: ${({ p }) => p.fakeInput.backgroundColor};
      overflow: hidden;
      transition: background-color ${MICROINTERACTION.s} ease-out,
        box-shadow ${MICROINTERACTION.s} ease-out;

      .checkbox {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 0;
        flex-shrink: 0;
        width: ${FONT_SIZE.m};
        height: ${FONT_SIZE.m};
        background-color: transparent;
        border-width: ${NOT_FONT_SIZE['6xs']};
        border-style: solid;
        border-color: ${colorAlphaAdapter(COLOR.a, 1)};
        border-radius: ${NOT_FONT_SIZE['5xs']};
        transition: background-color ${MICROINTERACTION.s} ease-out,
          border-color ${MICROINTERACTION.s} ease-out;

        .icon-container {
          color: ${COLOR.a};
          opacity: 0;
          transform: scale(0);
          transition: opacity ${MICROINTERACTION.s} ease-out,
            transform ${MICROINTERACTION.s} ease-out;
        }
      }

      .text {
        color: ${({ p }) => p.fakeInput.text.color};
        text-overflow: ellipsis;
        overflow: hidden;
        transition: color ${MICROINTERACTION.s} ease-out;
      }
    }

    ${({ p }) => p.styled};
  `
}
