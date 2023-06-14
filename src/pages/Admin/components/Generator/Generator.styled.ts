import { MICROINTERACTION } from '@/styles'
import { MAIN_GAP } from '@/tools'
import styled from 'styled-components'

export namespace GeneratorStyled {
  export const Component = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${MAIN_GAP};

    .generator-content {
      display: flex;
      gap: ${MAIN_GAP};

      .generator-items {
        display: flex;
        flex-direction: column;
        gap: ${MAIN_GAP};
        padding-top: ${MAIN_GAP};

        .generator-item {
          display: flex;
          gap: ${MAIN_GAP};
          opacity: 0;
          animation: show ${MICROINTERACTION.m} ease-in forwards;
        }

        @keyframes show {
          to {
            opacity: 1;
          }
        }
      }
    }
  `
}
