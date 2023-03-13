import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  insetBorderAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

interface CheckboxStyleProvider {
  fakeInput: {
    backgroundColor: string
    text: {
      color: string
    }
  }
}

export const checkboxStyleAdapter = (darkMode: boolean): CheckboxStyleProvider => {
  // #region Auxiliary vars

  return {
    fakeInput: {
      backgroundColor: colorAdapter(darkMode ? 'g-14' : 'g-0'),
      text: {
        color: colorAdapter(darkMode ? 'g-4' : 'g-12'),
      },
    },
  }
}

export const StylizedCheckbox = styled.div<{ p: CheckboxStyleProvider }>`
  position: relative;
  display: inline-block;

  .input {
    position: absolute;
    z-index: 1;
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
          transform: scale(1);
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
    gap: calc(
      (${fontSizeAdapter('m')} - ${fontSizeAdapter('xs')}) * 0.5 + ${notFontSizeAdapter('3xs')}
    );
    padding: ${notFontSizeAdapter('3xs')};
    padding-right: calc(
      (${fontSizeAdapter('m')} - ${fontSizeAdapter('xs')}) * 0.5 + ${notFontSizeAdapter('3xs')}
    );
    border-radius: ${notFontSizeAdapter('4xs')};
    background-color: ${({ p }) => p.fakeInput.backgroundColor};
    transition: background-color ${microinteractionAdapter(2)} ease-out,
      box-shadow ${microinteractionAdapter(2)} ease-out;

    .checkbox {
      display: flex;
      justify-content: center;
      align-items: center;
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
      line-height: ${fontSizeAdapter('xs')};
      color: ${({ p }) => p.fakeInput.text.color};
    }
  }

  :hover .fake-input {
    box-shadow: ${shadowAdapter(2)};
  }
`
