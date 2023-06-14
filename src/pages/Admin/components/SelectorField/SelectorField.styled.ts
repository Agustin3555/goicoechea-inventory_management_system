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
import { BRIGHT_2, DARK_2, MAIN_GAP } from '@/tools'

interface NormalizedProps {
  titleColor: {
    dark: Color
    bright: Color
  }
  mainColor: Color
  backgroundColor: {
    dark: Color
    bright: Color
  }
}

interface Provider {
  color: Value
  box: {
    selector: {
      backgroundColor: Value
      selected: {
        input: {
          borderColor: Value
          color: Value
          focus: {
            borderColor: Value
          }
          placeholder: {
            color: Value
          }
        }
      }
      animationContainer: {
        items: {
          scrollbarThumb: {
            backgroundColor: Value
            hover: {
              backgroundColor: Value
            }
          }
          item: {
            input: {
              hover: {
                fakeInput: {
                  backgroundColor: Value
                }
              }
              checked: {
                fakeInput: {
                  backgroundColor: Value
                }
              }
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

const boxHeight = `calc(${MAIN_GAP} * 3)`
const inputBorderWidth = NOT_FONT_SIZE['6xs']
const inputHeight = `calc(${boxHeight} - ${PADDING} * 2)`
const selectedGap = `calc((${inputHeight} - ${ARROW_WH}) / 2 + ${PADDING})`
const selectedPadding = `${PADDING} ${selectedGap} ${PADDING} ${PADDING}`

const measurementProvider = {
  box: {
    height: boxHeight,
    selector: {
      height: boxHeight,
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
          borderWidth: inputBorderWidth,
        },
      },
      animationContainer: {
        height: `calc(${boxHeight} * ${NUM_OF_OPTIONS_TO_SHOW} + ${boxHeight} * 0.5)`,
        items: {
          item: {
            height: boxHeight,
            fakeInput: {
              padding: `0 ${INPUT_PADDING}`,
            },
          },
        },
      },
    },
  },
}

export namespace SelectorFieldStyled {
  export interface Props {
    titleColor?: {
      dark?: Color
      bright?: Color
    }
    mainColor?: Color
    backgroundColor?: {
      dark?: Color
      bright?: Color
    }
    styled?: FlattenSimpleInterpolation
  }

  export const adapter = (darkMode: boolean, style?: Props): Provider => {
    const normalizedProps: NormalizedProps = {
      titleColor: {
        dark: style?.titleColor?.dark || COLOR.g_4,
        bright: style?.titleColor?.bright || COLOR.g_12,
      },
      mainColor: style?.mainColor || COLOR.a,
      backgroundColor: {
        dark: style?.backgroundColor?.dark || DARK_2,
        bright: style?.backgroundColor?.bright || BRIGHT_2,
      },
    }

    // #region Auxiliary vars

    const inputColor = colorAdapter(darkMode ? COLOR.g_0 : COLOR.g_19)

    // #endregion

    return {
      color: darkMode
        ? normalizedProps.titleColor.dark
        : normalizedProps.titleColor.bright,
      box: {
        selector: {
          backgroundColor: darkMode
            ? normalizedProps.backgroundColor.dark
            : normalizedProps.backgroundColor.bright,
          selected: {
            input: {
              borderColor: colorAlphaAdapter(
                darkMode
                  ? normalizedProps.backgroundColor.dark
                  : normalizedProps.backgroundColor.bright,
                0,
                darkMode ? 2 : -2
              ),
              color: inputColor,
              focus: {
                borderColor: colorAlphaAdapter(
                  darkMode
                    ? normalizedProps.backgroundColor.dark
                    : normalizedProps.backgroundColor.bright,
                  1,
                  darkMode ? 2 : -2
                ),
              },
              placeholder: {
                color: inputColor,
              },
            },
          },
          animationContainer: {
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
                      backgroundColor: darkMode ? COLOR.g_13 : COLOR.g_1,
                    },
                  },
                  checked: {
                    fakeInput: {
                      backgroundColor: normalizedProps.mainColor,
                    },
                  },
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
    gap: ${MAIN_GAP};
    color: ${({ p }) => p.color};

    .box {
      height: ${measurementProvider.box.height};

      .selector {
        position: relative;
        display: flex;
        flex-direction: column;
        height: ${measurementProvider.box.selector.height};
        border-radius: ${NOT_FONT_SIZE['4xs']};
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
          gap: ${measurementProvider.box.selector.selected.gap};
          padding: ${measurementProvider.box.selector.selected.padding};

          .input {
            width: 100%;
            height: ${measurementProvider.box.selector.selected.input.height};
            padding: ${measurementProvider.box.selector.selected.input.padding};
            color: ${({ p }) => p.box.selector.selected.input.color};
            background-color: transparent;
            border-width: ${measurementProvider.box.selector.selected.input
              .borderWidth};
            border-style: solid;
            border-color: ${({ p }) => p.box.selector.selected.input.borderColor};
            border-radius: ${NOT_FONT_SIZE['5xs']};
            transition: background-color ${MICROINTERACTION.s} ease-out,
              border-color ${MICROINTERACTION.s} ease-out;

            :focus {
              border-color: ${({ p }) =>
                p.box.selector.selected.input.focus.borderColor};
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
          height: ${measurementProvider.box.selector.animationContainer.height};
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
                p.box.selector.animationContainer.items.scrollbarThumb
                  .backgroundColor};

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
                    p.box.selector.animationContainer.items.item.input.hover
                      .fakeInput.backgroundColor};
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
                height: ${measurementProvider.box.selector.animationContainer.items
                  .item.height};
                padding: ${measurementProvider.box.selector.animationContainer.items
                  .item.fakeInput.padding};
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
        height: ${measurementProvider.box.selector.dataExpanded.true.height};
        box-shadow: ${shadowAdapter(2)};
      }
    }

    ${({ p }) => p.styled};
  `
}
