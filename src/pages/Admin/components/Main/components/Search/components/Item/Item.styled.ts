import styled from 'styled-components'
import { COLOR, MICROINTERACTION, NOT_FONT_SIZE, Value } from '@/styles'
import { MAIN_GAP } from '@/tools'

interface Provider {
  minHeight: Value
  color: Value
  itemHead: {
    backgroundColor: Value
  }
  itemBody: {
    borderColor: Value
  }
}

export namespace ItemStyled {
  export const adapter = (
    darkMode: boolean,
    expanded: boolean,
    height: number
  ): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {
      minHeight: `calc(${MAIN_GAP} * 4 ${
        expanded ? `+ ${NOT_FONT_SIZE['6xs']} * 2 + ${height}px` : ''
      })`,
      color: darkMode ? COLOR.g_4 : COLOR.g_12,
      itemHead: {
        backgroundColor: darkMode ? COLOR.g_14 : COLOR.g_0,
      },
      itemBody: {
        borderColor: darkMode ? COLOR.g_12 : COLOR.g_6,
      },
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    display: flex;
    flex-direction: column;
    min-height: ${({ p }) => p.minHeight};
    color: ${({ p }) => p.color};
    border-radius: ${NOT_FONT_SIZE['3xs']};
    overflow: hidden;
    transition: min-height 0.6s ease, background-color ${MICROINTERACTION.s} ease-out;

    :hover .item-head .actions {
      opacity: 1;
    }

    .item-head {
      padding: calc(${MAIN_GAP} * 0.5);
      display: flex;
      justify-content: space-between;
      gap: calc(${MAIN_GAP} * 0.5);
      background-color: ${({ p }) => p.itemHead.backgroundColor};
      transition: background-color ${MICROINTERACTION.s} ease-out;

      .actions {
        display: flex;
        gap: calc(${MAIN_GAP} * 0.5);
        flex-grow: 1;
        opacity: 0;
        transition: opacity ${MICROINTERACTION.s} ease-out;
      }

      @media (pointer: coarse) {
        .actions {
          opacity: 1;
        }
      }
    }

    .item-body {
      border-width: ${NOT_FONT_SIZE['6xs']};
      border-style: solid;
      border-color: ${({ p }) => p.itemBody.borderColor};
      border-radius: 0 0 ${NOT_FONT_SIZE['3xs']} ${NOT_FONT_SIZE['3xs']};
      transition: border-color ${MICROINTERACTION.s} ease-out;

      .body-AC {
        transition: opacity ${MICROINTERACTION.s} ease-out;

        .icon-C {
          display: flex;
          justify-content: center;
          padding: calc(${MAIN_GAP} * 2);
        }

        .properties {
          display: flex;
          flex-wrap: wrap;
          column-gap: ${MAIN_GAP};
          row-gap: calc(${MAIN_GAP} * 2);
          padding: ${MAIN_GAP};
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
  `
}
