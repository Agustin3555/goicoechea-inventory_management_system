import styled from 'styled-components'
import { COLOR, FONT_SIZE, MICROINTERACTION, Value, colorAdapter } from '@/styles'
import { BRIGHT_1, DARK_1, MAIN_GAP } from '@/tools'

interface Provider {
  title: {
    color: Value
  }
  fields: {
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
      fields: {
        color: colorAdapter(darkMode ? DARK_1 : BRIGHT_1),
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
      column-gap: ${MAIN_GAP};
      row-gap: calc(${MAIN_GAP} * 2);
      color: ${({ p }) => p.fields.color};
    }
  `
}
