import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
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

export interface SelectorStyleProps {
  styled?: FlattenSimpleInterpolation
  color?: {
    dark?: Color
    bright?: Color
  }
  backgroundColor?: {
    dark?: Color
    bright?: Color
  }
  inputBackgroundColor?: {
    dark?: Color
    bright?: Color
  }
}

interface SelectorNormalizedStyleProps {
  color: {
    dark: Color
    bright: Color
  }
  backgroundColor: {
    dark: Color
    bright: Color
  }
  inputBackgroundColor: {
    dark: Color
    bright: Color
  }
}

interface SelectorProvider {
  styled?: FlattenSimpleInterpolation
  selectorContainer: {
    color: string
    backgroundColor: string
    selected: {
      padding: string
      cursor: string
      input: {
        color: string
        backgroundColor: string
      }
    }
    items: {
      scrollbarThumb: {
        backgroundColor: string
        hover: {
          backgroundColor: string
        }
      }
      item: {
        input: {
          hover: {
            fakeInput: {
              backgroundColor: string
            }
          }
        }
      }
    }
  }
}

export const selectorAdapter = (
  darkMode: boolean,
  variable: boolean,
  style?: SelectorStyleProps
): SelectorProvider => {
  const normalizedProps: SelectorNormalizedStyleProps = {
    color: {
      dark: style?.color?.dark || 'g-4',
      bright: style?.color?.bright || 'g-12',
    },
    backgroundColor: {
      dark: style?.backgroundColor?.dark || 'g-14',
      bright: style?.backgroundColor?.bright || 'g-0',
    },
    inputBackgroundColor: {
      dark: style?.inputBackgroundColor?.dark || 'g-15',
      bright: style?.inputBackgroundColor?.bright || 'g-1',
    },
  }

  // #region Auxiliary vars

  // #endregion

  return {
    styled: style?.styled,
    selectorContainer: {
      color: colorAdapter(
        darkMode ? normalizedProps.color.dark : normalizedProps.color.bright
      ),
      backgroundColor: colorAdapter(
        darkMode
          ? normalizedProps.backgroundColor.dark
          : normalizedProps.backgroundColor.bright
      ),
      selected: {
        padding: variable ? `calc(${fontSizeAdapter('xs')} * 0.5)` : fontSizeAdapter('xs'),
        cursor: variable ? '' : 'pointer',
        input: {
          color: colorAdapter(darkMode ? 'g-0' : 'g-19'),
          backgroundColor: colorAdapter(
            darkMode
              ? normalizedProps.inputBackgroundColor.dark
              : normalizedProps.inputBackgroundColor.bright
          ),
          // placeholder: {
          //   color:
          // }
        },
      },
      items: {
        scrollbarThumb: {
          backgroundColor: colorAdapter(
            darkMode
              ? normalizedProps.backgroundColor.dark
              : normalizedProps.backgroundColor.bright,
            darkMode ? 2 : -2
          ),
          hover: {
            backgroundColor: colorAdapter(
              darkMode
                ? normalizedProps.backgroundColor.dark
                : normalizedProps.backgroundColor.bright,
              darkMode ? 3 : -3
            ),
          },
        },
        item: {
          input: {
            hover: {
              fakeInput: {
                backgroundColor: colorAdapter(darkMode ? 'g-13' : 'g-1'),
              },
            },
          },
        },
      },
    },
  }
}

export const StylizedSelector = styled.div<{ p: SelectorProvider }>`
  height: calc(${fontSizeAdapter('xs')} * 6);

  .selector-container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(${fontSizeAdapter('xs')} * 3);
    margin-top: ${fontSizeAdapter('xs')};
    border-radius: ${notFontSizeAdapter('3xs')};
    color: ${({ p }) => p.selectorContainer.color};
    background-color: ${({ p }) => p.selectorContainer.backgroundColor};
    overflow: hidden;
    transition: box-shadow ${microinteractionAdapter(2)} ease-out,
      height ${microinteractionAdapter(2)} ease-out,
      background-color ${microinteractionAdapter(2)} ease-out;

    :hover {
      box-shadow: ${shadowAdapter(2)};
    }

    .selected {
      display: flex;
      align-items: center;
      gap: ${fontSizeAdapter('xs')};
      padding: ${({ p }) => p.selectorContainer.selected.padding};
      padding-right: ${fontSizeAdapter('xs')};
      cursor: ${({ p }) => p.selectorContainer.selected.cursor};

      .input {
        width: 100%;
        padding: calc(${fontSizeAdapter('xs')} * 0.5);
        height: calc(${fontSizeAdapter('xs')} * 2);
        font-size: ${fontSizeAdapter('xs')};
        color: ${({ p }) => p.selectorContainer.selected.input.color};
        border: none;
        border-radius: ${notFontSizeAdapter('5xs')};
        background-color: ${({ p }) => p.selectorContainer.selected.input.backgroundColor};
        box-shadow: ${insetBorderAdapter('6xs', 'a', 0.5)};
        transition: background-color ${microinteractionAdapter(2)} ease-out,
          box-shadow ${microinteractionAdapter(2)} ease-out;

        :focus {
          box-shadow: ${insetBorderAdapter('6xs', 'a', 1)};
          outline: none;
        }

        ::placeholder {
          color: ${colorAdapter('g-8')};
        }
      }

      .text {
        width: 100%;
        font-size: ${fontSizeAdapter('xs')};
        line-height: ${fontSizeAdapter('xs')};
      }

      .icon-container {
        transition: transform ${microinteractionAdapter(2)} ease-out;
      }

      .icon-container[data-expanded='true'] {
        transform: rotate(-180deg);
      }
    }

    .animation-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(${fontSizeAdapter('xs')} * 3 * 3 + ${fontSizeAdapter('xs')} * 2.5);
      transition: opacity ${microinteractionAdapter(1)} ease-out;

      .spinner-container {
        margin-top: ${notFontSizeAdapter('4xs')};
      }

      .items {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;

        ::-webkit-scrollbar-thumb {
          background-color: ${({ p }) =>
            p.selectorContainer.items.scrollbarThumb.backgroundColor};

          :hover {
            background-color: ${({ p }) =>
              p.selectorContainer.items.scrollbarThumb.hover.backgroundColor};
          }
        }

        .item {
          position: relative;

          .input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;

            :checked {
              cursor: default;
            }

            :hover + .fake-input {
              background-color: ${({ p }) =>
                p.selectorContainer.items.item.input.hover.fakeInput.backgroundColor};
            }
          }

          .fake-input {
            padding: ${fontSizeAdapter('xs')};
            transition: background-color ${microinteractionAdapter(2)} ease-out;

            .text {
              font-size: ${fontSizeAdapter('xs')};
              line-height: ${fontSizeAdapter('xs')};
            }
          }
        }
      }
    }

    .fade-enter {
      opacity: 0;
    }

    .fade-exit {
      opacity: 1;
    }

    .fade-enter-active {
      opacity: 1;
    }

    .fade-exit-active {
      opacity: 0;
    }
  }

  .selector-container[data-expanded='true'] {
    z-index: 1;
    height: calc(${fontSizeAdapter('xs')} * 3 * 4 + ${fontSizeAdapter('xs')} * 2.5);
    box-shadow: ${shadowAdapter(2)};
  }

  ${({ p }) => p.styled};
`
