import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'
import styled from 'styled-components'

export const StylizedAdmin = styled.div`
  position: relative;

  .deep-touch {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${colorAdapter('g-19')};
    cursor: pointer;
  }

  .deep-touch[data-disable='false'] {
    opacity: 0.25;
    visibility: visible;
    transition: opacity ${microinteractionAdapter(1)} ease-out;
  }

  .deep-touch[data-disable='true'] {
    opacity: 0;
    visibility: hidden;
    transition: opacity ${microinteractionAdapter(1)} ease-out,
      visibility ${microinteractionAdapter(1)} ${microinteractionAdapter(1)};
  }

  // TODO: no funciona, no tiene la prioridad
  @media (min-width: 90rem) {
    .deep-touch {
      opacity: 0;
      visibility: hidden;
      transition: opacity ${microinteractionAdapter(1)} ease-out,
        visibility ${microinteractionAdapter(1)} ${microinteractionAdapter(1)};
    }
  }
`
