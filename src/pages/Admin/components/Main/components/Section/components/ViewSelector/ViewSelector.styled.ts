import styled from 'styled-components'
import {
  COLOR,
  FONT_SIZE,
  MICROINTERACTION,
  NOT_FONT_SIZE,
  Value,
  shadowAdapter,
} from '@/styles'
import { BRIGHT_2, DARK_2, MAIN_BORDER_RADIUS, MAIN_GAP } from '@/tools'

interface Provider {
  viewSelectorContainer: {
    color: Value
    backgroundColor: Value
    hover: {
      height: Value
    }
    items: {
      item: {
        input: {
          hover: {
            fake: {
              backgroundColor: Value
            }
          }
        }
      }
    }
  }
}

const HEIGHT = `calc(${MAIN_GAP} * 3)`

export namespace ViewSelectorStyled {
  export const adapter = (darkMode: boolean, amountValues: number): Provider => {
    // #region Auxiliary vars

    return {
      viewSelectorContainer: {
        color: darkMode ? COLOR.g_4 : COLOR.g_12,
        backgroundColor: darkMode ? DARK_2 : BRIGHT_2,
        hover: {
          height: `calc(${MAIN_GAP} * 3 * ${amountValues + 1})`,
        },
        items: {
          item: {
            input: {
              hover: {
                fake: {
                  backgroundColor: darkMode ? COLOR.g_13 : COLOR.g_1,
                },
              },
            },
          },
        },
      },
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    position: relative;
    height: ${HEIGHT};

    .main-container {
      display: flex;
      flex-direction: column;
      height: ${HEIGHT};
      border-radius: ${MAIN_BORDER_RADIUS};
      color: ${({ p }) => p.viewSelectorContainer.color};
      background-color: ${({ p }) => p.viewSelectorContainer.backgroundColor};
      overflow: hidden;
      transition: box-shadow ${MICROINTERACTION.s} ease-out,
        height ${MICROINTERACTION.s} ease-out, background-color ${MICROINTERACTION.s} ease-out;

      :hover {
        box-shadow: ${shadowAdapter(2)};
        height: ${({ p }) => p.viewSelectorContainer.hover.height};
      }

      .selected {
        display: flex;
        gap: ${MAIN_GAP};
        padding: ${MAIN_GAP};
        align-items: center;

        .group {
          display: flex;
          gap: ${MAIN_GAP};
          width: 100%;
          transition: color ${MICROINTERACTION.s} ease-out;
        }
      }

      .items {
        display: flex;
        flex-direction: column;
        height: 0;

        .item {
          position: relative;

          .input {
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;

            :checked {
              cursor: default;
            }

            :hover + .fake {
              background-color: ${({ p }) =>
                p.viewSelectorContainer.items.item.input.hover.fake.backgroundColor};
            }
          }

          .fake {
            display: flex;
            gap: ${MAIN_GAP};
            padding: ${MAIN_GAP};
            transition: background-color ${MICROINTERACTION.s} ease-out;

            .separation {
              width: calc(${MAIN_GAP} * 2 + ${NOT_FONT_SIZE['6xs']});
            }
          }
        }
      }
    }
  `
}
