import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

interface ViewSelectorProvider {
  viewSelectorContainer: {
    color: string
    backgroundColor: string
    hover: {
      height: string
    }
    items: {
      item: {
        input: {
          hover: {
            fake: {
              backgroundColor: string
            }
          }
        }
      }
    }
  }
}

export const viewSelectorAdapter = (
  darkMode: boolean,
  amountValues: number
): ViewSelectorProvider => {
  // #region Auxiliary vars

  return {
    viewSelectorContainer: {
      color: colorAdapter(darkMode ? 'g-4' : 'g-12'),
      backgroundColor: colorAdapter(darkMode ? 'g-14' : 'g-0'),
      hover: {
        height: `calc(${fontSizeAdapter('xs')} * 3 * ${amountValues + 1})`,
      },
      items: {
        item: {
          input: {
            hover: {
              fake: {
                backgroundColor: colorAdapter(darkMode ? 'g-13' : 'g-1'),
              },
            },
          },
        },
      },
    },
  }
}

export const StylizedViewSelector = styled.div<{ p: ViewSelectorProvider }>`
  position: relative;
  height: calc(${fontSizeAdapter('xs')} * 3);

  .view-selector-container {
    display: flex;
    flex-direction: column;
    height: calc(${fontSizeAdapter('xs')} * 3);
    border-radius: ${notFontSizeAdapter('3xs')};
    color: ${({ p }) => p.viewSelectorContainer.color};
    background-color: ${({ p }) => p.viewSelectorContainer.backgroundColor};
    overflow: hidden;
    transition: box-shadow ${microinteractionAdapter(2)} ease-out,
      height ${microinteractionAdapter(2)} ease-out,
      background-color ${microinteractionAdapter(2)} ease-out;

    .selected {
      display: flex;
      gap: ${fontSizeAdapter('xs')};
      padding: ${fontSizeAdapter('xs')};

      .group {
        display: flex;
        gap: ${fontSizeAdapter('xs')};
        width: 100%;
        transition: color ${microinteractionAdapter(2)} ease-out;
      }
    }

    .items {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 0;

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

          :hover + .fake {
            background-color: ${({ p }) =>
              p.viewSelectorContainer.items.item.input.hover.fake.backgroundColor};
          }
        }

        .fake {
          display: flex;
          gap: ${fontSizeAdapter('xs')};
          padding: ${fontSizeAdapter('xs')};
          transition: background-color ${microinteractionAdapter(2)} ease-out;

          .separation {
            width: calc(${fontSizeAdapter('xs')} * 2 + ${notFontSizeAdapter('6xs')});
          }
        }
      }
    }

    .text {
      font-size: ${fontSizeAdapter('xs')};
      line-height: ${fontSizeAdapter('xs')};
    }

    :hover {
      box-shadow: ${shadowAdapter(2)};
      height: ${({ p }) => p.viewSelectorContainer.hover.height};
    }
  }
`
