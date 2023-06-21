import styled from 'styled-components'
import { MAIN_GAP, Value } from '@/tools'
import { COLOR, MICROINTERACTION, NOT_FONT_SIZE, shadowAdapter } from '@/styles'

interface Provider {
  title: {
    color: Value
  }
  itemPropertiesItems: {
    item: {
      color: Value
      key: {
        color: Value
      }
    }
  }
}

export namespace ItemPropertiesStyled {
  export const adapter = (darkMode: boolean): Provider => {
    return {
      title: {
        color: darkMode ? COLOR.a_b1 : COLOR.a,
      },
      itemPropertiesItems: {
        item: {
          color: darkMode ? COLOR.g_0 : COLOR.g_19,
          key: {
            color: darkMode ? COLOR.b_b2 : COLOR.b,
          },
        },
      },
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: calc(${MAIN_GAP} * 2);

    .title {
      color: ${({ p }) => p.title.color};
      transition: color ${MICROINTERACTION.s} ease-out;
    }

    .item-properties-items {
      display: flex;
      flex-wrap: wrap;
      gap: calc(${MAIN_GAP} * 2);

      .item {
        display: flex;
        gap: ${MAIN_GAP};
        color: ${({ p }) => p.itemPropertiesItems.item.color};

        .key {
          color: ${({ p }) => p.itemPropertiesItems.item.key.color};
        }
      }
    }
  `
}
