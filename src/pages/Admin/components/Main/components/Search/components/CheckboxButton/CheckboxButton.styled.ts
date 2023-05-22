import styled from 'styled-components'
import {
  COLOR,
  Color,
  FONT_SIZE,
  FontSize,
  MICROINTERACTION,
  NOT_FONT_SIZE,
  shadowAdapter,
  Value,
} from '@/styles'

interface NormalizedProps {
  padding: FontSize
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
  padding: Value
  fakeInput: {
    color: Value
    backgroundColor: Value
  }
}

export namespace CheckboxButtonStyled {
  export interface Props {
    padding?: FontSize
    color?: {
      dark?: Color
      bright?: Color
    }
    backgroundColor?: {
      dark?: Color
      bright?: Color
    }
  }

  export const adapter = (darkMode: boolean, style?: Props): Provider => {
    const normalizedProps: NormalizedProps = {
      padding: style?.padding || FONT_SIZE['2xs'],
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

    // #endregion

    return {
      padding: normalizedProps.padding,
      fakeInput: {
        color: darkMode ? normalizedProps.color.dark : normalizedProps.color.bright,
        backgroundColor: darkMode
          ? normalizedProps.backgroundColor.dark
          : normalizedProps.backgroundColor.bright,
      },
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
        background-color: ${COLOR.a};
      }
    }

    .fake-input {
      display: flex;
      align-items: center;
      padding: ${({ p }) => p.padding};
      color: ${({ p }) => p.fakeInput.color};
      border-radius: ${NOT_FONT_SIZE['4xs']};
      background-color: ${({ p }) => p.fakeInput.backgroundColor};
      overflow: hidden;
      transition: color ${MICROINTERACTION.s} ease-out,
        background-color ${MICROINTERACTION.s} ease-out,
        box-shadow ${MICROINTERACTION.s} ease-out;
    }
  `
}
