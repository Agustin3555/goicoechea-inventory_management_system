import { COLOR, MICROINTERACTION } from '@/styles'
import styled from 'styled-components'

export namespace AdminStyled {
  export const Component = styled.div`
    position: relative;
    height: 100%;

    .deep-touch {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: ${COLOR.g_19};
      cursor: pointer;
    }

    .deep-touch[data-disable='false'] {
      opacity: 0.25;
      visibility: visible;
      transition: opacity ${MICROINTERACTION.xs} ease-out;
    }

    .deep-touch[data-disable='true'] {
      opacity: 0;
      visibility: hidden;
      transition: opacity ${MICROINTERACTION.xs} ease-out,
        visibility ${MICROINTERACTION.xs} ${MICROINTERACTION.xs};
    }

    @media (min-width: 90rem) {
      .deep-touch[data-disable='false'] {
        opacity: 0;
        visibility: hidden;
        transition: opacity ${MICROINTERACTION.xs} ease-out,
          visibility ${MICROINTERACTION.xs} ${MICROINTERACTION.xs};
      }
    }
  `
}
