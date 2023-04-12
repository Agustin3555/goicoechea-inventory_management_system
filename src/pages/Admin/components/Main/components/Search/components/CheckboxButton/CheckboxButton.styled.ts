import styled from 'styled-components'
import {
  Color,
  colorAdapter,
  FontSize,
  fontSizeAdapter,
  insetBorderAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

export interface CheckboxButtonStyleProps {
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

interface CheckboxButtonNormalizedStyleProps {
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

interface CheckboxButtonStyleProvider {
  padding: string
  fakeInput: {
    color: string
    backgroundColor: string
  }
}

export const checkboxButtonStyleAdapter = (
  darkMode: boolean,
  style?: CheckboxButtonStyleProps
): CheckboxButtonStyleProvider => {
  const normalizedProps: CheckboxButtonNormalizedStyleProps = {
    padding: style?.padding || 'xs',
    color: {
      dark: style?.color?.dark || 'g-4',
      bright: style?.color?.bright || 'g-12',
    },
    backgroundColor: {
      dark: style?.backgroundColor?.dark || 'g-14',
      bright: style?.backgroundColor?.bright || 'g-0',
    },
  }

  // #region Auxiliary vars

  // #endregion

  return {
    padding: fontSizeAdapter(normalizedProps.padding),
    fakeInput: {
      color: colorAdapter(
        darkMode ? normalizedProps.color.dark : normalizedProps.color.bright
      ),
      backgroundColor: colorAdapter(
        darkMode
          ? normalizedProps.backgroundColor.dark
          : normalizedProps.backgroundColor.bright
      ),
    },
  }
}

export const StylizedCheckboxButton = styled.div<{ p: CheckboxButtonStyleProvider }>`
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
      color: ${colorAdapter('g-0')};
      background-color: ${colorAdapter('a')};
    }
  }

  .fake-input {
    display: flex;
    align-items: center;
    padding: ${({ p }) => p.padding};
    color: ${({ p }) => p.fakeInput.color};
    border-radius: ${notFontSizeAdapter('4xs')};
    background-color: ${({ p }) => p.fakeInput.backgroundColor};
    overflow: hidden;
    transition: color ${microinteractionAdapter(2)} ease-out,
      background-color ${microinteractionAdapter(2)} ease-out,
      box-shadow ${microinteractionAdapter(2)} ease-out;
  }
`
