import styled from 'styled-components'
import { colorAdapter, fontSizeAdapter, microinteractionAdapter } from '@/styles'
import { GAP } from '@/tools'

interface SearchStyleProvider {}

export const searchStyleAdapter = (darkMode: boolean): SearchStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {}
}

export const StylizedSearch = styled.div<{ p: SearchStyleProvider }>`
  display: flex;
  flex-direction: column;
  gap: ${GAP};
  height: 100%;

  .search-head {
    display: flex;
    align-items: center;
    gap: ${GAP};
    color: ${colorAdapter('a')};

    .counter {
      font-size: ${fontSizeAdapter('s')};
      line-height: ${fontSizeAdapter('s')};
    }

    .form {
      display: flex;
      align-items: center;
      gap: ${GAP};
      width: 100%;

      .button-content {
        color: ${colorAdapter('g-0')};
        transition: opacity ${microinteractionAdapter(2)} ease-in-out;
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

  .items {
    display: flex;
    flex-direction: column;
    gap: ${GAP};
    height: calc(100% - ${GAP} - 114px);
    overflow-y: scroll;
    padding-right: ${GAP};
  }
`
