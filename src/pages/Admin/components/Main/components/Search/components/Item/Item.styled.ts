import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
} from '@/styles'
import { GAP } from '@/tools'

interface ItemStyleProvider {
  height: string
  backgroundColor: string
}

export const itemStyleAdapter = (
  darkMode: boolean,
  expanded: boolean,
  height: number
): ItemStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {
    height: `calc(${fontSizeAdapter('xs')} * 4 ${
      expanded ? `+ ${notFontSizeAdapter('6xs')} + ${fontSizeAdapter('xs')} + ${height}px` : ''
    })`,
    backgroundColor: colorAdapter(darkMode ? 'g-14' : 'g-0'),
  }
}

export const StylizedItem = styled.div<{ p: ItemStyleProvider }>`
  display: flex;
  flex-direction: column;
  gap: calc(${fontSizeAdapter('xs')} * 0.5);
  min-height: ${({ p }) => p.height};
  padding: calc(${fontSizeAdapter('xs')} * 0.5);
  border-radius: ${notFontSizeAdapter('3xs')};
  background-color: ${({ p }) => p.backgroundColor};
  overflow: hidden;
  transition: min-height ${microinteractionAdapter(2)} ease-out,
    background-color ${microinteractionAdapter(2)} ease-out;

  .item-head {
    display: flex;
    justify-content: space-between;
    gap: calc(${fontSizeAdapter('xs')} * 0.5);

    .actions {
      display: flex;
      gap: calc(${fontSizeAdapter('xs')} * 0.5);
      opacity: 0;
      transition: opacity ${microinteractionAdapter(2)} ease-out;
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
    gap: ${GAP};
  }
`
