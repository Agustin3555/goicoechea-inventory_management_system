import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
} from '@/styles'

interface SearchStyleProvider {}

export const searchStyleAdapter = (darkMode: boolean): SearchStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {}
}

export const StylizedSearch = styled.div<{ p: SearchStyleProvider }>`
  display: flex;
  flex-direction: column;
  gap: ${fontSizeAdapter('xs')};
  height: 100%;

  .search-head {
    display: flex;
    align-items: center;
    gap: ${fontSizeAdapter('xs')};
    color: ${colorAdapter('a')};

    .counter {
      font-size: ${fontSizeAdapter('xs')};
      line-height: ${fontSizeAdapter('xs')};
    }

    .form {
      display: flex;
      align-items: center;
      gap: ${fontSizeAdapter('xs')};
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
    gap: ${fontSizeAdapter('xs')};
    height: calc(100% - ${fontSizeAdapter('xs')} - 114px);
    overflow-y: scroll;
    padding-right: ${fontSizeAdapter('xs')};
  }
`
