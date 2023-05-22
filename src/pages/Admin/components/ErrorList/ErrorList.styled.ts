import styled from 'styled-components'
import { COLOR, FONT_SIZE, MICROINTERACTION } from '@/styles'

export namespace ErrorListStyled {
  export const Component = styled.div`
    color: ${COLOR.a};

    .item {
      line-height: calc(${FONT_SIZE.xs} * 1.5);
      opacity: 0;
      animation: show ${MICROINTERACTION.m} ease-out forwards;

      @keyframes show {
        to {
          opacity: 1;
        }
      }
    }
  `
}
