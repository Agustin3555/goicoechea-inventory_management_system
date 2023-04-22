import styled from 'styled-components'
import {
  colorAdapter,
  colorWithAlpha,
  fontSizeAdapter,
  microinteractionAdapter,
  NotFontSize,
  notFontSizeAdapter,
} from '@/styles'

type InputFontSize = 'xs' | 's'
type InputWidthProp = 'expanded' | NotFontSize

export interface InputStyleProps {
  width?: InputWidthProp
  fontSize?: InputFontSize
}

interface InputNormalizedStyleProps {
  width: InputWidthProp
  fontSize: InputFontSize
}

interface InputStyleProvider {
  width: string
  label: {
    color: string
  }
  input: {
    padding: string
    height: string
    fontSize: string
    color: string
    placeholder: {
      color: string
    }
  }
}

export const inputStyleAdapter = (
  darkMode: boolean,
  style?: InputStyleProps
): InputStyleProvider => {
  const normalizedProps: InputNormalizedStyleProps = {
    width: style?.width || 'expanded',
    fontSize: style?.fontSize || 'xs',
  }

  // #region Auxiliary vars

  const fontSize = fontSizeAdapter(normalizedProps.fontSize)

  // #endregion

  return {
    width:
      normalizedProps.width === 'expanded'
        ? '100%'
        : notFontSizeAdapter(normalizedProps.width),
    label: {
      color: colorAdapter(darkMode ? 'g-2' : 'g-18'),
    },
    input: {
      padding: fontSize,
      height: `calc(${fontSize} * 3)`,
      fontSize,
      color: colorAdapter(darkMode ? 'g-0' : 'g-19'),
      placeholder: {
        color: colorAdapter(darkMode ? 'g-8' : 'g-8'),
      },
    },
  }
}

export const StylizedInput = styled.div<{ p: InputStyleProvider }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${fontSizeAdapter('xs')};
  width: ${({ p }) => p.width};

  .label {
    font-size: ${fontSizeAdapter('xs')};
    line-height: ${fontSizeAdapter('xs')};
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
    border-width: ${notFontSizeAdapter('6xs')};
    border-style: solid;
    border-color: ${colorWithAlpha('a', 0.375)};
    border-radius: ${notFontSizeAdapter('4xs')};
    transition: border-color ${microinteractionAdapter(2)} ease-out;

    :focus {
      border-color: ${colorWithAlpha('a', 1)};
      outline: none;
    }

    ::placeholder {
      color: ${({ p }) => p.input.placeholder.color};
    }
  }
`
