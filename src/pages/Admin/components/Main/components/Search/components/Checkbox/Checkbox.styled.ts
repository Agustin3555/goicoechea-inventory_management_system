import styled from 'styled-components'
import {
  Color,
  colorAdapter,
  fontSizeAdapter,
  insetBorderAdapter,
  microinteractionAdapter,
  NotFontSize,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

type CheckboxWidthProp = 'content' | 'expanded' | NotFontSize
type CheckboxFontSize = 'xs' | 's'

export interface CheckboxStyleProps {
  width?: CheckboxWidthProp
  fontSize?: CheckboxFontSize
  color?: {
    dark?: Color
    bright?: Color
  }
  backgroundColor?: {
    dark?: Color
    bright?: Color
  }
}

interface CheckboxNormalizedStyleProps {
  width: CheckboxWidthProp
  fontSize: CheckboxFontSize
  color: {
    dark: Color
    bright: Color
  }
  backgroundColor: {
    dark: Color
    bright: Color
  }
}

interface CheckboxStyleProvider {
  width: string
  fakeInput: {
    gap: string
    padding: string
    paddingRight: string
    backgroundColor: string
    text: {
      color: string
    }
  }
}

export const checkboxStyleAdapter = (
  darkMode: boolean,
  style?: CheckboxStyleProps
): CheckboxStyleProvider => {
  const normalizedProps: CheckboxNormalizedStyleProps = {
    width: style?.width || 'content',
    fontSize: style?.fontSize || 'xs',
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

  const checkboxDimension = fontSizeAdapter('m')
  const fontSize = fontSizeAdapter(normalizedProps.fontSize)
  const internalDif = `calc((${checkboxDimension} - ${fontSize}) * 0.5)`
  const padding = `calc(${fontSize} - ${internalDif})`
  const gap = `calc(${internalDif} + ${padding})`

  // #endregion

  return {
    width:
      normalizedProps.width === 'content'
        ? ''
        : normalizedProps.width === 'expanded'
        ? '100%'
        : notFontSizeAdapter(normalizedProps.width),
    fakeInput: {
      gap,
      padding,
      paddingRight: gap,
      backgroundColor: colorAdapter(
        darkMode
          ? normalizedProps.backgroundColor.dark
          : normalizedProps.backgroundColor.bright
      ),
      text: {
        color: colorAdapter(
          darkMode ? normalizedProps.color.dark : normalizedProps.color.bright
        ),
      },
    },
  }
}

export const StylizedCheckbox = styled.div<{ p: CheckboxStyleProvider }>`
  position: relative;
  width: ${({ p }) => p.width};

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
      background-color: ${colorAdapter('a')};

      .checkbox {
        background-color: ${colorAdapter('g-0')};
        box-shadow: none;

        .icon-container {
          opacity: 1;
          transform: initial;
        }
      }

      .text {
        color: ${colorAdapter('g-0')};
      }
    }
  }

  .fake-input {
    display: flex;
    align-items: center;
    gap: ${({ p }) => p.fakeInput.gap};
    padding: ${({ p }) => p.fakeInput.padding};
    padding-right: ${({ p }) => p.fakeInput.paddingRight};
    border-radius: ${notFontSizeAdapter('4xs')};
    background-color: ${({ p }) => p.fakeInput.backgroundColor};
    overflow: hidden;
    transition: background-color ${microinteractionAdapter(2)} ease-out,
      box-shadow ${microinteractionAdapter(2)} ease-out;

    .checkbox {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 0;
      flex-shrink: 0;
      width: ${fontSizeAdapter('m')};
      height: ${fontSizeAdapter('m')};
      border-radius: ${notFontSizeAdapter('5xs')};
      background-color: transparent;
      box-shadow: ${insetBorderAdapter('6xs', 'a', 1)};
      transition: background-color ${microinteractionAdapter(2)} ease-out,
        box-shadow ${microinteractionAdapter(2)} ease-out;

      .icon-container {
        color: ${colorAdapter('a')};
        opacity: 0;
        transform: scale(0);
        transition: opacity ${microinteractionAdapter(2)} ease-out,
          transform ${microinteractionAdapter(2)} ease-out;
      }
    }

    .text {
      font-size: ${fontSizeAdapter('xs')};
      color: ${({ p }) => p.fakeInput.text.color};
      text-overflow: ellipsis;
      overflow: hidden;
      transition: color ${microinteractionAdapter(2)} ease-out;
    }
  }
`
