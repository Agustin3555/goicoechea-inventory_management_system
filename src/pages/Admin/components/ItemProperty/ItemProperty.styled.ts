import styled from 'styled-components'
import { MAIN_GAP, Value } from '@/tools'
import { COLOR, MICROINTERACTION, NOT_FONT_SIZE, shadowAdapter } from '@/styles'

interface Provider {
  title: {
    color: Value
  }
  top: {
    value: {
      color: Value
    }
    editButtonMC: {
      opacity: Value
    }
  }
  bottom: {
    borderColor: Value
    backgroundColor: Value
    opacity: Value
    transform: Value
    pointerEvents: Value
  }
}

export namespace ItemPropertyStyled {
  export const adapter = (darkMode: boolean, editing: boolean): Provider => {
    return {
      title: {
        color: darkMode ? COLOR.a_b1 : COLOR.a,
      },
      top: {
        value: {
          color: darkMode ? COLOR.g_0 : COLOR.g_19,
        },
        editButtonMC: {
          opacity: editing ? 1 : 0,
        },
      },
      bottom: {
        borderColor: darkMode ? COLOR.b_b1 : COLOR.b_b1,
        backgroundColor: darkMode ? COLOR.g_15 : COLOR.g_1,
        opacity: editing ? 1 : 0,
        transform: editing
          ? `translateY(0)`
          : `translateY(calc(${MAIN_GAP} * 0.5 * -1))`,
        pointerEvents: editing ? 'all' : 'none',
      },
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${MAIN_GAP};

    .title {
      color: ${({ p }) => p.title.color};
      transition: color ${MICROINTERACTION.s} ease-out;
    }

    :hover .top .edit-button-MC {
      opacity: 1;
    }

    .top {
      display: flex;
      align-items: center;
      gap: calc(${MAIN_GAP} * 2);

      .value {
        color: ${({ p }) => p.top.value.color};
        line-height: calc(${MAIN_GAP} * 1.5);
      }

      .edit-button-MC {
        opacity: ${({ p }) => p.top.editButtonMC.opacity};
        transition: opacity ${MICROINTERACTION.s} ease-out;
      }
    }

    .bottom {
      position: absolute;
      z-index: 1;
      top: calc(${MAIN_GAP} * 6);
      display: flex;
      gap: calc(${MAIN_GAP} * 0.5);
      padding: calc(${MAIN_GAP} * 0.5);
      border-style: solid;
      border-color: ${({ p }) => p.bottom.borderColor};
      border-width: ${NOT_FONT_SIZE['6xs']};
      border-radius: ${NOT_FONT_SIZE['3xs']};
      background-color: ${({ p }) => p.bottom.backgroundColor};
      box-shadow: ${shadowAdapter(3)};
      opacity: ${({ p }) => p.bottom.opacity};
      transform: ${({ p }) => p.bottom.transform};
      pointer-events: ${({ p }) => p.bottom.pointerEvents};
      transition: border-color ${MICROINTERACTION.s} ease-out,
        background-color ${MICROINTERACTION.s} ease-out,
        opacity ${MICROINTERACTION.s} ease-out,
        transform ${MICROINTERACTION.s} ease-out;
    }
  `
}
