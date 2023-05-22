import styled, { FlattenSimpleInterpolation } from 'styled-components'
import {
  COLOR,
  colorAlphaAdapter,
  FONT_SIZE,
  MICROINTERACTION,
  NOT_FONT_SIZE,
  Value,
} from '@/styles'

type Size = 'xs' | 's'

interface NormalizedProps {
  size: Size
}

interface Provider {
  label: {
    color: Value
  }
  input: {
    padding: Value
    height: Value
    fontSize: Value
    color: Value
    placeholder: {
      color: Value
    }
  }
  styled?: FlattenSimpleInterpolation
}

export namespace InputStyled {
  export interface Props {
    fontSize?: Size
    styled?: FlattenSimpleInterpolation
  }

  export const adapter = (darkMode: boolean, style?: Props): Provider => {
    const normalizedProps: NormalizedProps = {
      size: style?.fontSize || 'xs',
    }

    // #region Auxiliary vars

    const fontSize = FONT_SIZE[normalizedProps.size]

    // #endregion

    return {
      label: {
        color: darkMode ? COLOR.g_2 : COLOR.g_18,
      },
      input: {
        padding: fontSize,
        height: `calc(${fontSize} * 3)`,
        fontSize,
        color: darkMode ? COLOR.g_0 : COLOR.g_19,
        placeholder: {
          color: darkMode ? COLOR.g_8 : COLOR.g_8,
        },
      },
      styled: style?.styled,
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${FONT_SIZE.xs};

    .label {
      font-size: ${FONT_SIZE.xs};
      line-height: ${FONT_SIZE.xs};
      color: ${({ p }) => p.label.color};
      cursor: pointer;
    }

    .input {
      width: 100%;
      padding: ${({ p }) => p.input.padding};
      height: ${({ p }) => p.input.height};
      font-size: ${({ p }) => p.input.fontSize};
      color: ${({ p }) => p.input.color};
      background: transparent;
      border-width: ${NOT_FONT_SIZE['6xs']};
      border-style: solid;
      border-color: ${colorAlphaAdapter(COLOR.a, 0.375)};
      border-radius: ${NOT_FONT_SIZE['4xs']};
      transition: border-color ${MICROINTERACTION.s} ease-out;

      :focus {
        border-color: ${colorAlphaAdapter(COLOR.a, 1)};
        outline: none;
      }

      ::placeholder {
        color: ${({ p }) => p.input.placeholder.color};
      }
    }

    ${({ p }) => p.styled};
  `
}
