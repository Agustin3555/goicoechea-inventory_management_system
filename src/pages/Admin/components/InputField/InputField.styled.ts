import styled, { FlattenSimpleInterpolation } from 'styled-components'
import {
  Color,
  COLOR,
  colorAlphaAdapter,
  FONT_SIZE,
  MICROINTERACTION,
  NOT_FONT_SIZE,
  Value,
} from '@/styles'
import { MAIN_BORDER_RADIUS, MAIN_GAP } from '@/tools'

interface NormalizedProps {
  titleColor: {
    dark: Color
    bright: Color
  }
  mainColor: Color
}

interface Provider {
  fieldTitle: {
    color: Value
  }
  input: {
    borderColor: Value
    color: Value
    focus: {
      borderColor: Value
    }
  }
  styled?: FlattenSimpleInterpolation
}

const borderWidth = NOT_FONT_SIZE['6xs']

export namespace InputFieldStyled {
  export interface Props {
    titleColor?: {
      dark?: Color
      bright?: Color
    }
    mainColor?: Color
    styled?: FlattenSimpleInterpolation
  }

  export const adapter = (darkMode: boolean, style?: Props): Provider => {
    const normalizedProps: NormalizedProps = {
      titleColor: {
        dark: style?.titleColor?.dark || COLOR.g_4,
        bright: style?.titleColor?.bright || COLOR.g_12,
      },
      mainColor: style?.mainColor || COLOR.a,
    }

    // #region Auxiliary vars

    // #endregion

    return {
      fieldTitle: {
        color: darkMode
          ? normalizedProps.titleColor.dark
          : normalizedProps.titleColor.bright,
      },
      input: {
        color: darkMode ? COLOR.g_0 : COLOR.g_19,
        borderColor: colorAlphaAdapter(normalizedProps.mainColor, 0.375),
        focus: {
          borderColor: colorAlphaAdapter(normalizedProps.mainColor, 1),
        },
      },
      styled: style?.styled,
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    display: flex;
    flex-direction: column;
    gap: ${MAIN_GAP};
    min-width: calc(${MAIN_GAP} * 18);

    .field-title {
      color: ${({ p }) => p.fieldTitle.color};
    }

    .input {
      width: 100%;
      height: calc(${MAIN_GAP} * 3);
      padding: calc((${MAIN_GAP} + (${borderWidth} * -1)) - ${NOT_FONT_SIZE['5xs']})
        calc(${MAIN_GAP} + (${borderWidth} * -1));
      color: ${({ p }) => p.input.color};
      background: transparent;
      border-width: ${borderWidth};
      border-style: solid;
      border-color: ${({ p }) => p.input.borderColor};
      border-radius: ${MAIN_BORDER_RADIUS};
      transition: border-color ${MICROINTERACTION.s} ease-out;

      :focus {
        border-color: ${({ p }) => p.input.focus.borderColor};
        outline: none;
      }
    }

    .area {
      line-height: calc(${FONT_SIZE.xs} * 1.5);
      min-width: calc(${NOT_FONT_SIZE['3xl']});
      min-height: calc(${NOT_FONT_SIZE['2xl']});
    }

    ${({ p }) => p.styled};
  `
}
