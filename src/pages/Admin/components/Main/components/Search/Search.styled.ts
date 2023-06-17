import styled from 'styled-components'
import { MAIN_GAP } from '@/tools'
import { COLOR, FONT_SIZE, MICROINTERACTION } from '@/styles'

interface Provider {}

export namespace SearchStyled {
  export const adapter = (darkMode: boolean): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {}
  }

  export const Component = styled.div<{ p: Provider }>`
    display: flex;
    flex-direction: column;
    gap: ${MAIN_GAP};
    height: 100%;

    .search-head {
      display: flex;
      align-items: center;
      gap: ${MAIN_GAP};
      color: ${COLOR.a};

      .counter {
        font-size: ${FONT_SIZE.s};
        line-height: ${FONT_SIZE.s};
      }

      .form {
        display: flex;
        align-items: center;
        gap: ${MAIN_GAP};
        width: 100%;

        .button-content {
          color: ${COLOR.g_0};
          transition: opacity ${MICROINTERACTION.s} ease-in-out;
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
      gap: ${MAIN_GAP};
      height: calc(100% - ${MAIN_GAP} - 109px);
      overflow-y: scroll;
      padding-right: ${MAIN_GAP};
    }
  `
}
