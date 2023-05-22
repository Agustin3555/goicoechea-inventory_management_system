import styled from 'styled-components'
import { COLOR, FONT_SIZE, NOT_FONT_SIZE, Value, colorAdapter } from '@/styles'

interface Provider {
  content: {
    description: {
      color: Value
    }
  }
}

export namespace NotFoundStyled {
  export const adapter = (darkMode: boolean): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {
      content: {
        description: {
          color: colorAdapter(darkMode ? COLOR.g_4 : COLOR.g_16),
        },
      },
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    width: 100%;
    height: 100%;

    .content {
      display: flex;
      flex-direction: column;
      gap: calc(${NOT_FONT_SIZE.m} * 2);

      .description {
        line-height: calc(${FONT_SIZE.s} * 1.5);
        color: ${({ p }) => p.content.description.color};
      }

      .button-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${FONT_SIZE.s};
        height: ${FONT_SIZE.s};
        color: ${COLOR.g_0};
      }
    }
  `
}
