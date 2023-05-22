import styled from 'styled-components'
import { COLOR, FONT_SIZE, MICROINTERACTION, NOT_FONT_SIZE, Value } from '@/styles'
import { MAIN_GAP } from '@/tools'

interface Provider {
  height: Value
  backgroundColor: Value
}

export namespace ItemStyled {
  export const adapter = (darkMode: boolean, expanded: boolean, height: number): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {
      height: `calc(${FONT_SIZE.xs} * 4 ${
        expanded ? `+ ${NOT_FONT_SIZE['6xs']} + ${FONT_SIZE.xs} + ${height}px` : ''
      })`,
      backgroundColor: darkMode ? COLOR.g_14 : COLOR.g_0,
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    display: flex;
    flex-direction: column;
    gap: calc(${FONT_SIZE.xs} * 0.5);
    min-height: ${({ p }) => p.height};
    padding: calc(${FONT_SIZE.xs} * 0.5);
    border-radius: ${NOT_FONT_SIZE['3xs']};
    background-color: ${({ p }) => p.backgroundColor};
    overflow: hidden;
    transition: min-height ${MICROINTERACTION.s} ease-out,
      background-color ${MICROINTERACTION.s} ease-out;

    .item-head {
      display: flex;
      justify-content: space-between;
      gap: calc(${FONT_SIZE.xs} * 0.5);

      .actions {
        display: flex;
        gap: calc(${FONT_SIZE.xs} * 0.5);
        opacity: 0;
        transition: opacity ${MICROINTERACTION.s} ease-out;
      }

      :hover .actions {
        opacity: 1;
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
    }
  `
}
