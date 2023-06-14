import styled, { FlattenSimpleInterpolation } from 'styled-components'
import {
  COLOR,
  Color,
  FONT_SIZE,
  MICROINTERACTION,
  NOT_FONT_SIZE,
  Value,
  colorAlphaAdapter,
  shadowAdapter,
} from '@/styles'
import { BRIGHT_2, DARK_2, MAIN_BORDER_RADIUS, MAIN_GAP } from '@/tools'

interface NormalizedProps {
  titleColor: {
    dark: Color
    bright: Color
  }
  mainColor: Color
  inactiveValueColor: {
    dark: Color
    bright: Color
  }
  inactiveBackgroundColor: {
    dark: Color
    bright: Color
  }
}

interface Provider {
  fieldTitle: {
    color: Value
  }
  checkbox: {
    input: {
      checked: {
        fakeInput: {
          backgroundColor: Value
          box: {
            borderColor: Value
          }
        }
      }
    }
    fakeInput: {
      backgroundColor: Value
      text: {
        color: Value
      }
      box: {
        borderColor: Value
        iconHC: {
          color: Value
        }
      }
    }
  }
  styled?: FlattenSimpleInterpolation
}

const VALUE_SIZE = MAIN_GAP
const BOX_DIMENSION = FONT_SIZE.m

const height = `calc(${MAIN_GAP} * 3)`
const padding = `calc((${height} - ${BOX_DIMENSION}) * 0.5)`
const internalDif = `calc((${BOX_DIMENSION} - ${VALUE_SIZE}) * 0.5)`
const gap = `calc(${internalDif} + ${padding})`

export namespace CheckboxFieldStyled {
  export interface Props {
    titleColor?: {
      dark?: Color
      bright?: Color
    }
    mainColor?: Color
    inactiveValueColor?: {
      dark?: Color
      bright?: Color
    }
    inactiveBackgroundColor?: {
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
      inactiveValueColor: {
        dark: style?.inactiveValueColor?.dark || COLOR.g_4,
        bright: style?.inactiveValueColor?.bright || COLOR.g_12,
      },
      inactiveBackgroundColor: {
        dark: style?.inactiveBackgroundColor?.dark || DARK_2,
        bright: style?.inactiveBackgroundColor?.bright || BRIGHT_2,
      },
    }

    // #region Auxiliary vars

    // #endregion

    return {
      fieldTitle: {
        color: darkMode
          ? normalizedProps.titleColor.dark
          : normalizedProps.titleColor.bright,
      },
      checkbox: {
        input: {
          checked: {
            fakeInput: {
              backgroundColor: normalizedProps.mainColor,
              box: {
                borderColor: colorAlphaAdapter(normalizedProps.mainColor, 0),
              },
            },
          },
        },
        fakeInput: {
          backgroundColor: darkMode
            ? normalizedProps.inactiveBackgroundColor.dark
            : normalizedProps.inactiveBackgroundColor.bright,
          text: {
            color: darkMode
              ? normalizedProps.inactiveValueColor.dark
              : normalizedProps.inactiveValueColor.bright,
          },
          box: {
            borderColor: colorAlphaAdapter(normalizedProps.mainColor, 1),
            iconHC: {
              color: normalizedProps.mainColor,
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
    align-items: start;

    .field-title {
      color: ${({ p }) => p.fieldTitle.color};
    }

    .checkbox {
      height: ${height};
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
          background-color: ${({ p }) =>
            p.checkbox.input.checked.fakeInput.backgroundColor};

          .box {
            background-color: ${COLOR.g_0};
            border-color: ${({ p }) =>
              p.checkbox.input.checked.fakeInput.box.borderColor};

            .icon-HC {
              opacity: 1;
              transform: initial;
            }
          }

          .value {
            color: ${COLOR.g_0};
          }
        }
      }

      .fake-input {
        display: flex;
        align-items: center;
        gap: ${gap};
        height: 100%;
        padding: ${padding};
        padding-right: ${gap};
        border-radius: ${MAIN_BORDER_RADIUS};
        background-color: ${({ p }) => p.checkbox.fakeInput.backgroundColor};
        overflow: hidden;
        transition: background-color ${MICROINTERACTION.s} ease-out,
          box-shadow ${MICROINTERACTION.s} ease-out;

        .box {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-grow: 0;
          flex-shrink: 0;
          width: ${BOX_DIMENSION};
          height: ${BOX_DIMENSION};
          background-color: transparent;
          border-width: ${NOT_FONT_SIZE['6xs']};
          border-style: solid;
          border-color: ${({ p }) => p.checkbox.fakeInput.box.borderColor};
          border-radius: ${NOT_FONT_SIZE['5xs']};
          transition: background-color ${MICROINTERACTION.s} ease-out,
            border-color ${MICROINTERACTION.s} ease-out;

          .icon-HC {
            color: ${({ p }) => p.checkbox.fakeInput.box.iconHC.color};
            opacity: 0;
            transform: scale(0);
            transition: opacity ${MICROINTERACTION.s} ease-out,
              transform ${MICROINTERACTION.s} ease-out;
          }
        }

        .value {
          display: block;
          width: ${FONT_SIZE.m};
          color: ${({ p }) => p.checkbox.fakeInput.text.color};
          transition: color ${MICROINTERACTION.s} ease-out,
            opacity ${MICROINTERACTION.xs} ease-out;
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
    }

    ${({ p }) => p.styled};
  `
}
