import styled, { FlattenSimpleInterpolation } from 'styled-components'
import {
  Color,
  colorAdapter,
  colorWithAlpha,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

export interface SelectorFieldStyleProps {
  styled?: FlattenSimpleInterpolation
  color?: {
    dark?: Color
    bright?: Color
  }
  backgroundColor?: {
    dark?: Color
    bright?: Color
  }
}

interface SelectorFieldNormalizedStyleProps {
  color: {
    dark: Color
    bright: Color
  }
  backgroundColor: {
    dark: Color
    bright: Color
  }
}

interface SelectorFieldProvider {
  styled?: FlattenSimpleInterpolation
  selectorFieldContainer: {
    color: string
    backgroundColor: string
    selected: {
      input: {
        color: string
        borderColor: string
        hover: {
          borderColor: string
        }
        placeholder: {
          color: string
        }
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

export const selectorFieldAdapter = (
  darkMode: boolean,
  style?: SelectorFieldStyleProps
): SelectorFieldProvider => {
  const normalizedProps: SelectorFieldNormalizedStyleProps = {
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

  const inputColor = colorAdapter(darkMode ? 'g-0' : 'g-19')

  // #endregion

  return {
    styled: style?.styled,
    selectorFieldContainer: {
      color: colorAdapter(
        darkMode ? normalizedProps.color.dark : normalizedProps.color.bright
      ),
      backgroundColor: colorAdapter(
        darkMode
          ? normalizedProps.backgroundColor.dark
          : normalizedProps.backgroundColor.bright
      ),
      selected: {
        input: {
          color: inputColor,
          borderColor: colorWithAlpha(
            darkMode ? normalizedProps.color.dark : normalizedProps.color.bright,
            0
          ),
          hover: {
            borderColor: colorWithAlpha(
              darkMode ? normalizedProps.color.dark : normalizedProps.color.bright,
              1,
              darkMode ? -8 : 10
            ),
          },
          placeholder: {
            color: inputColor,
          },
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

export const StylizedSelectorField = styled.div<{ p: SelectorFieldProvider }>`
  display: flex;
  flex-direction: column;
  gap: ${fontSizeAdapter('xs')};

  .box-selector {
    height: calc(${fontSizeAdapter('xs')} * 3);

    .selector-field-container {
      position: relative;
      display: flex;
      flex-direction: column;
      height: calc(${fontSizeAdapter('xs')} * 3);
      border-radius: ${notFontSizeAdapter('3xs')};
      color: ${({ p }) => p.selectorFieldContainer.color};
      background-color: ${({ p }) => p.selectorFieldContainer.backgroundColor};
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
        padding: calc(${fontSizeAdapter('xs')} * 0.5);
        padding-right: ${fontSizeAdapter('xs')};

        .input {
          width: 100%;
          padding: calc(${fontSizeAdapter('xs')} * 0.5);
          height: calc(${fontSizeAdapter('xs')} * 2);
          font-size: ${fontSizeAdapter('xs')};
          color: ${({ p }) => p.selectorFieldContainer.selected.input.color};
          background-color: transparent;
          border-width: ${notFontSizeAdapter('6xs')};
          border-style: solid;
          border-color: ${({ p }) => p.selectorFieldContainer.selected.input.borderColor};
          border-radius: ${notFontSizeAdapter('5xs')};
          transition: border-color ${microinteractionAdapter(2)} ease-out;

          :focus {
            border-color: ${({ p }) =>
              p.selectorFieldContainer.selected.input.hover.borderColor};
            outline: none;
          }

          ::placeholder {
            color: ${({ p }) => p.selectorFieldContainer.selected.input.placeholder.color};
            transition: color ${microinteractionAdapter(2)} ease-out;
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
              p.selectorFieldContainer.items.scrollbarThumb.backgroundColor};

            :hover {
              background-color: ${({ p }) =>
                p.selectorFieldContainer.items.scrollbarThumb.hover.backgroundColor};
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

              :hover + .fake-input {
                background-color: ${({ p }) =>
                  p.selectorFieldContainer.items.item.input.hover.fakeInput.backgroundColor};
              }

              :checked {
                cursor: default;

                + .fake-input {
                  color: ${colorAdapter('g-0')};
                  background-color: ${colorAdapter('a')};
                }
              }
            }

            .fake-input {
              padding: ${fontSizeAdapter('xs')};
              transition: color ${microinteractionAdapter(2)} ease-out,
                background-color ${microinteractionAdapter(2)} ease-out;

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

    .selector-field-container[data-expanded='true'] {
      z-index: 1;
      height: calc(${fontSizeAdapter('xs')} * 3 * 4 + ${fontSizeAdapter('xs')} * 2.5);
      box-shadow: ${shadowAdapter(2)};
    }
  }

  .error-required {
    color: ${colorAdapter('a')};
    font-size: ${fontSizeAdapter('xs')};
    line-height: calc(${fontSizeAdapter('xs')} * 1.5);
  }

  ${({ p }) => p.styled};
`
