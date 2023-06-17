import styled from 'styled-components'
import { COLOR, MICROINTERACTION, NOT_FONT_SIZE, Value } from '@/styles'
import { MAIN_GAP } from '@/tools'

interface Provider {
  minHeight: Value
  color: Value
  backgroundColor: Value
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
        expanded ? `+ ${NOT_FONT_SIZE['6xs']} + ${MAIN_GAP} + ${height}px` : ''
      })`,
      color: darkMode ? COLOR.g_4 : COLOR.g_12,
      backgroundColor: darkMode ? COLOR.g_14 : COLOR.g_0,
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    display: flex;
    flex-direction: column;
    min-height: ${({ p }) => p.minHeight};
    color: ${({ p }) => p.color};
    border-radius: ${NOT_FONT_SIZE['3xs']};
    background-color: ${({ p }) => p.backgroundColor};
    overflow: hidden;
    transition: min-height 0.6s ease, background-color ${MICROINTERACTION.s} ease-out;

    .item-head {
      padding: calc(${MAIN_GAP} * 0.5);
      display: flex;
      justify-content: space-between;
      gap: calc(${MAIN_GAP} * 0.5);

      :hover .actions {
        opacity: 1;
      }

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

    .properties {
      display: flex;
      gap: ${MAIN_GAP};
      padding: ${MAIN_GAP};
    }
  `
}
