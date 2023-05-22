import styled from 'styled-components'
import {
  COLOR,
  FONT_SIZE,
  MICROINTERACTION,
  NOT_FONT_SIZE,
  Value,
  shadowAdapter,
} from '@/styles'

interface Provider {
  card: {
    backgroundColor: Value
    title: {
      color: Value
    }
  }
}

export namespace SinglePageOnCardStyled {
  export const adapter = (darkMode: boolean): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {
      card: {
        backgroundColor: darkMode ? COLOR.g_15 : COLOR.g_0,
        title: {
          color: darkMode ? COLOR.g_2 : COLOR.g_12,
        },
      },
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: ${NOT_FONT_SIZE.xs};

    .card {
      display: flex;
      flex-direction: column;
      gap: calc(${NOT_FONT_SIZE.m} * 2);
      width: calc(${NOT_FONT_SIZE['4xl']} - ${NOT_FONT_SIZE.xl});
      padding: ${NOT_FONT_SIZE.m};
      background-color: ${({ p }) => p.card.backgroundColor};
      border-radius: ${NOT_FONT_SIZE['2xs']};
      box-shadow: ${shadowAdapter(2)};
      transition: background-color ${MICROINTERACTION.s} ease-out;

      .title {
        font-size: ${FONT_SIZE.l};
        line-height: ${FONT_SIZE.l};
        font-weight: 700;
        color: ${({ p }) => p.card.title.color};
        transition: color ${MICROINTERACTION.s} ease-out;
      }
    }

    .dark-mode-container {
      position: absolute;
      left: ${NOT_FONT_SIZE.xs};
      bottom: ${NOT_FONT_SIZE.xs};
    }
  `
}
