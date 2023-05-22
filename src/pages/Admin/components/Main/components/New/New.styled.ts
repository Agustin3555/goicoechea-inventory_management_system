import styled from 'styled-components'
import { COLOR, FONT_SIZE, MICROINTERACTION, Value, colorAdapter } from '@/styles'
import { MAIN_GAP } from '@/tools'

interface Provider {
  title: {
    color: Value
  }
}

export namespace NewStyled {
  export const adapter = (darkMode: boolean): Provider => {
    // #region Auxiliary vars

    // #endregion

    return {
      title: {
        color: colorAdapter(darkMode ? COLOR.g_2 : COLOR.g_14),
      },
    }
  }

  export const Component = styled.form<{ p: Provider }>`
    max-height: calc(100% - 53px - ${MAIN_GAP});
    padding-right: ${MAIN_GAP};
    overflow-y: scroll;
    overflow-x: hidden;

    .title {
      margin-top: ${MAIN_GAP};
      margin-bottom: calc(${FONT_SIZE.m} * 2);
      font-size: ${FONT_SIZE.m};
      line-height: ${FONT_SIZE.m};
      font-weight: 500;
      color: ${({ p }) => p.title.color};
      transition: color ${MICROINTERACTION.s} ease-out;
    }

    .fields {
      display: flex;
      flex-wrap: wrap;
      gap: ${MAIN_GAP};
    }
  `
}
