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

export interface InputSelectorFieldStyleProps {
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
  styled?: FlattenSimpleInterpolation
}

interface InputSelectorFieldNormalizedStyleProps {
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

interface InputSelectorFieldProvider {
  box: {
    height: string
    selector: {
      height: string
      color: string
      backgroundColor: string
      dataExpanded: {
        true: {
          height: string
        }
      }
      selected: {
        gap: string
        padding: string
        input: {
          height: string
          padding: string
          color: string
          borderWidth: string
          backgroundColor: string
          placeholder: {
            color: string
          }
        }
      }
      animationContainer: {
        height: string
        items: {
          scrollbarThumb: {
            backgroundColor: string
            hover: {
              backgroundColor: string
            }
          }
          item: {
            height: string
            input: {
              hover: {
                fakeInput: {
                  backgroundColor: string
                }
              }
            }
            fakeInput: {
              padding: string
            }
          }
        }
      }
    }
  }
  styled?: FlattenSimpleInterpolation
}

const PADDING = notFontSizeAdapter('4xs')
const INPUT_PADDING = fontSizeAdapter('xs')
const ARROW_WH = fontSizeAdapter('xs')
const NUM_OF_OPTIONS_TO_SHOW = 4

const boxHeight = `calc(${fontSizeAdapter('xs')} * 3)`
const sumOfPaddingY = `calc(${PADDING} * 2)`
const inputHeight = `calc(${boxHeight} - ${sumOfPaddingY})`
const selectedGap = `calc((${inputHeight} - ${ARROW_WH}) / 2 + ${PADDING})`
const selectedPadding = `${PADDING} ${selectedGap} ${PADDING} ${PADDING}`
const inputBorderWidth = notFontSizeAdapter('6xs')

export const inputSelectorFieldAdapter = (
  darkMode: boolean,
  style?: InputSelectorFieldStyleProps
): InputSelectorFieldProvider => {
  const normalizedProps: InputSelectorFieldNormalizedStyleProps = {
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

  const inputColor = colorAdapter(darkMode ? 'g-0' : 'g-19')

  // #endregion

  return {
    box: {
      height: boxHeight,
      selector: {
        height: boxHeight,
        color: colorAdapter(
          darkMode ? normalizedProps.color.dark : normalizedProps.color.bright
        ),
        backgroundColor: colorAdapter(
          darkMode
            ? normalizedProps.backgroundColor.dark
            : normalizedProps.backgroundColor.bright
        ),
        dataExpanded: {
          true: {
            height: `calc(${boxHeight} * ${1 + NUM_OF_OPTIONS_TO_SHOW} + ${boxHeight} * 0.5)`,
          },
        },
        selected: {
          gap: selectedGap,
          padding: selectedPadding,
          input: {
            height: inputHeight,
            padding: `calc(${INPUT_PADDING} - ${PADDING} - ${inputBorderWidth})`,
            color: inputColor,
            borderWidth: inputBorderWidth,
            backgroundColor: colorAdapter(
              darkMode
                ? normalizedProps.inputBackgroundColor.dark
                : normalizedProps.inputBackgroundColor.bright
            ),
            placeholder: {
              color: inputColor,
            },
          },
        },
        animationContainer: {
          height: `calc(${boxHeight} * ${NUM_OF_OPTIONS_TO_SHOW} + ${boxHeight} * 0.5)`,
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
              height: boxHeight,
              input: {
                hover: {
                  fakeInput: {
                    backgroundColor: colorAdapter(darkMode ? 'g-13' : 'g-1'),
                  },
                },
              },
              fakeInput: {
                padding: `0 ${INPUT_PADDING}`,
              },
            },
          },
        },
      },
    },
    styled: style?.styled,
  }
}

export const StylizedInputSelectorField = styled.div<{ p: InputSelectorFieldProvider }>`
  display: flex;
  flex-direction: column;
  gap: ${fontSizeAdapter('xs')};

  .box {
    height: ${({ p }) => p.box.height};

    .selector {
      position: relative;
      display: flex;
      flex-direction: column;
      height: ${({ p }) => p.box.selector.height};
      border-radius: ${notFontSizeAdapter('4xs')};
      color: ${({ p }) => p.box.selector.color};
      background-color: ${({ p }) => p.box.selector.backgroundColor};
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
        gap: ${({ p }) => p.box.selector.selected.gap};
        padding: ${({ p }) => p.box.selector.selected.padding};

        .input {
          width: 100%;
          height: ${({ p }) => p.box.selector.selected.input.height};
          padding: ${({ p }) => p.box.selector.selected.input.padding};
          font-size: ${fontSizeAdapter('xs')};
          color: ${({ p }) => p.box.selector.selected.input.color};
          background-color: ${({ p }) => p.box.selector.selected.input.backgroundColor};
          border-width: ${({ p }) => p.box.selector.selected.input.borderWidth};
          border-style: solid;
          border-color: ${colorWithAlpha('a', 0.375)};
          border-radius: ${notFontSizeAdapter('5xs')};
          transition: background-color ${microinteractionAdapter(2)} ease-out,
            border-color ${microinteractionAdapter(2)} ease-out;

          :focus {
            border-color: ${colorWithAlpha('a', 1)};
            outline: none;
          }

          ::placeholder {
            color: ${({ p }) => p.box.selector.selected.input.placeholder.color};
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
        height: ${({ p }) => p.box.selector.animationContainer.height};
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
              p.box.selector.animationContainer.items.scrollbarThumb.backgroundColor};

            :hover {
              background-color: ${({ p }) =>
                p.box.selector.animationContainer.items.scrollbarThumb.hover.backgroundColor};
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
                  p.box.selector.animationContainer.items.item.input.hover.fakeInput
                    .backgroundColor};
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
              display: flex;
              align-items: center;
              height: ${({ p }) => p.box.selector.animationContainer.items.item.height};
              padding: ${({ p }) =>
                p.box.selector.animationContainer.items.item.fakeInput.padding};
              transition: color ${microinteractionAdapter(2)} ease-out,
                background-color ${microinteractionAdapter(2)} ease-out;

              .text {
                font-size: ${fontSizeAdapter('xs')};
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

    .selector[data-expanded='true'] {
      z-index: 1;
      height: ${({ p }) => p.box.selector.dataExpanded.true.height};
      box-shadow: ${shadowAdapter(2)};
    }
  }

  ${({ p }) => p.styled};
`
