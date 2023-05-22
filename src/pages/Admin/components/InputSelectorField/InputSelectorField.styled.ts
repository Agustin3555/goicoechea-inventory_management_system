import styled, { FlattenSimpleInterpolation } from 'styled-components'
import {
  COLOR,
  Color,
  FONT_SIZE,
  MICROINTERACTION,
  NOT_FONT_SIZE,
  Value,
  colorAdapter,
  colorAlphaAdapter,
  shadowAdapter,
} from '@/styles'

interface NormalizedProps {
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

interface Provider {
  box: {
    height: Value
    selector: {
      height: Value
      color: Value
      backgroundColor: Value
      dataExpanded: {
        true: {
          height: Value
        }
      }
      selected: {
        gap: Value
        padding: Value
        input: {
          height: Value
          padding: Value
          color: Value
          borderWidth: Value
          backgroundColor: Value
          placeholder: {
            color: Value
          }
        }
      }
      animationContainer: {
        height: Value
        items: {
          scrollbarThumb: {
            backgroundColor: Value
            hover: {
              backgroundColor: Value
            }
          }
          item: {
            height: Value
            input: {
              hover: {
                fakeInput: {
                  backgroundColor: Value
                }
              }
            }
            fakeInput: {
              padding: Value
            }
          }
        }
      }
    }
  }
  styled?: FlattenSimpleInterpolation
}

const PADDING = NOT_FONT_SIZE['4xs']
const INPUT_PADDING = FONT_SIZE.xs
const ARROW_WH = FONT_SIZE.xs
const NUM_OF_OPTIONS_TO_SHOW = 4

const boxHeight = `calc(${FONT_SIZE.xs} * 3)`
const sumOfPaddingY = `calc(${PADDING} * 2)`
const inputHeight = `calc(${boxHeight} - ${sumOfPaddingY})`
const selectedGap = `calc((${inputHeight} - ${ARROW_WH}) / 2 + ${PADDING})`
const selectedPadding = `${PADDING} ${selectedGap} ${PADDING} ${PADDING}`
const inputBorderWidth = NOT_FONT_SIZE['6xs']

export namespace InputSelectorFieldStyled {
  export interface Props {
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

  export const adapter = (darkMode: boolean, style?: Props): Provider => {
    const normalizedProps: NormalizedProps = {
      color: {
        dark: style?.color?.dark || COLOR.g_4,
        bright: style?.color?.bright || COLOR.g_12,
      },
      backgroundColor: {
        dark: style?.backgroundColor?.dark || COLOR.g_14,
        bright: style?.backgroundColor?.bright || COLOR.g_0,
      },
      inputBackgroundColor: {
        dark: style?.inputBackgroundColor?.dark || COLOR.g_15,
        bright: style?.inputBackgroundColor?.bright || COLOR.g_1,
      },
    }

    // #region Auxiliary vars

    const inputColor = colorAdapter(darkMode ? COLOR.g_0 : COLOR.g_19)

    // #endregion

    return {
      box: {
        height: boxHeight,
        selector: {
          height: boxHeight,
          color: colorAdapter(
            darkMode ? normalizedProps.color.dark : normalizedProps.color.bright
          ),
          backgroundColor: darkMode
            ? normalizedProps.backgroundColor.dark
            : normalizedProps.backgroundColor.bright,
          dataExpanded: {
            true: {
              height: `calc(${boxHeight} * ${
                1 + NUM_OF_OPTIONS_TO_SHOW
              } + ${boxHeight} * 0.5)`,
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
                      backgroundColor: darkMode ? COLOR.g_13 : COLOR.g_1,
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

  export const Component = styled.div<{ p: Provider }>`
    display: flex;
    flex-direction: column;
    gap: ${FONT_SIZE.xs};

    .box {
      height: ${({ p }) => p.box.height};

      .selector {
        position: relative;
        display: flex;
        flex-direction: column;
        height: ${({ p }) => p.box.selector.height};
        border-radius: ${NOT_FONT_SIZE['4xs']};
        color: ${({ p }) => p.box.selector.color};
        background-color: ${({ p }) => p.box.selector.backgroundColor};
        overflow: hidden;
        transition: box-shadow ${MICROINTERACTION.s} ease-out,
          height ${MICROINTERACTION.s} ease-out,
          background-color ${MICROINTERACTION.s} ease-out;

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
            color: ${({ p }) => p.box.selector.selected.input.color};
            background-color: ${({ p }) => p.box.selector.selected.input.backgroundColor};
            border-width: ${({ p }) => p.box.selector.selected.input.borderWidth};
            border-style: solid;
            border-color: ${colorAlphaAdapter(COLOR.a, 0.375)};
            border-radius: ${NOT_FONT_SIZE['5xs']};
            transition: background-color ${MICROINTERACTION.s} ease-out,
              border-color ${MICROINTERACTION.s} ease-out;

            :focus {
              border-color: ${colorAlphaAdapter(COLOR.a, 1)};
              outline: none;
            }

            ::placeholder {
              color: ${({ p }) => p.box.selector.selected.input.placeholder.color};
              transition: color ${MICROINTERACTION.s} ease-out;
            }
          }

          .text {
            width: 100%;
          }

          .icon-container {
            transition: transform ${MICROINTERACTION.s} ease-out;
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
          transition: opacity ${MICROINTERACTION.xs} ease-out;

          .spinner-container {
            margin-top: ${NOT_FONT_SIZE['4xs']};
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
                  p.box.selector.animationContainer.items.scrollbarThumb.hover
                    .backgroundColor};
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
                    color: ${COLOR.g_0};
                    background-color: ${COLOR.a};
                  }
                }
              }

              .fake-input {
                display: flex;
                align-items: center;
                height: ${({ p }) => p.box.selector.animationContainer.items.item.height};
                padding: ${({ p }) =>
                  p.box.selector.animationContainer.items.item.fakeInput.padding};
                transition: color ${MICROINTERACTION.s} ease-out,
                  background-color ${MICROINTERACTION.s} ease-out;
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
}
