import styled from 'styled-components'
import { colorAdapter, fontSizeAdapter, microinteractionAdapter } from '@/styles'
import { GAP } from '@/tools'

interface ItemPropertyStyleProvider {}

export const itemPropertyStyleAdapter = (darkMode: boolean): ItemPropertyStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {}
}

export const StylizedItemProperty = styled.div<{ p: ItemPropertyStyleProvider }>`
  display: flex;
  flex-direction: column;
  gap: ${GAP};

  .top,
  .bottom {
    display: flex;
    gap: ${GAP};
    align-items: center;
  }

  .top .value {
    line-height: ${fontSizeAdapter('xs')};
    font-size: ${fontSizeAdapter('xs')};
    color: ${colorAdapter('g-0')};
  }
`
