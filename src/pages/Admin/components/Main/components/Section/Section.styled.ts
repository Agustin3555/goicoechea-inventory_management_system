import styled from 'styled-components'
import { MAIN_GAP } from '@/tools'
import { COLOR, FONT_SIZE, MICROINTERACTION, Value } from '@/styles'

interface Provider {
  head: {
    color: Value
  }
}

export namespace SectionStyled {
  export const adapter = (darkMode: boolean): Provider => {
    // #region Auxiliary vars

    return {
      head: {
        color: darkMode ? COLOR.g_2 : COLOR.g_14,
      },
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    display: flex;
    flex-direction: column;
    gap: ${MAIN_GAP};
    height: 100%;

    .head {
      display: flex;
      align-items: center;
      gap: ${MAIN_GAP};
      color: ${({ p }) => p.head.color};
      transition: color ${MICROINTERACTION.s} ease-out;

      .title {
        width: 100%;
        font-size: ${FONT_SIZE.m};
        line-height: initial;
        font-weight: 500;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .animation-container {
      height: 100%;
      transition: opacity ${MICROINTERACTION.xs} ease-out;
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

    @media (min-width: 90rem) {
      .head .separator-container {
        display: none;
      }
    }

    @media (max-width: 26.5625rem) {
      .head {
        .icon-container {
          width: 100%;
        }

        .title {
          display: none;
        }
      }
    }
  `
}
