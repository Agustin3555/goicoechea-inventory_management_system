import styled from 'styled-components'
import {
  colorAdapter,
  FontSize,
  fontSizeAdapter,
  insetBorderAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
} from '@/styles'

type InputFontSize = 'xs' | 's'

export interface InputStyleProps {
  fontSize?: InputFontSize
}

interface InputNormalizedStyleProps {
  fontSize: InputFontSize
}

interface InputStyleProvider {
  label: {
    color: string
  }
  input: {
    padding: string
    fontSize: string
    lineHeight: string
    color: string
    boxShadow: string
    focus: {
      boxShadow: string
    }
  }
}

export const inputStyleAdapter = (
  darkMode: boolean,
  style?: InputStyleProps
): InputStyleProvider => {
  const normalizedProps: InputNormalizedStyleProps = {
    fontSize: style?.fontSize || 'xs',
  }

  // #region Auxiliary vars

  const fontSize = fontSizeAdapter(normalizedProps.fontSize)

  // #endregion

  return {
    label: {
      color: colorAdapter(darkMode ? 'g-2' : 'g-18'),
    },
    input: {
      padding: fontSize,
      fontSize,
      lineHeight: fontSize,
      color: colorAdapter(darkMode ? 'g-0' : 'g-19'),
      boxShadow: insetBorderAdapter('6xs', darkMode ? 'a' : 'a', 0.25, [true]),
      focus: {
        boxShadow: insetBorderAdapter('6xs', darkMode ? 'a' : 'a', 1, [true]),
      },
    },
  }
}

export const StylizedInput = styled.div<{ p: InputStyleProvider }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${fontSizeAdapter('xs')};

  .label {
    font-size: ${fontSizeAdapter('xs')};
    line-height: ${fontSizeAdapter('xs')};
    color: ${({ p }) => p.label.color};
    cursor: pointer;
  }

  .input {
    width: 100%;
    padding: ${({ p }) => p.input.padding};
    font-size: ${({ p }) => p.input.fontSize};
    line-height: ${({ p }) => p.input.lineHeight};
    color: ${({ p }) => p.input.color};
    background: transparent;
    border: none;
    border-radius: ${notFontSizeAdapter('3xs')};
    box-shadow: ${({ p }) => p.input.boxShadow};
    transition: box-shadow ${microinteractionAdapter(2)} ease-out;

    :focus {
      box-shadow: ${({ p }) => p.input.focus.boxShadow};
      outline: none;
    }
  }
`
