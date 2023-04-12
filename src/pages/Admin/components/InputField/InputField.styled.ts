import styled from 'styled-components'
import { colorAdapter, fontSizeAdapter, microinteractionAdapter } from '@/styles'

export const StylizedInputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${fontSizeAdapter('xs')};

  .errors {
    color: ${colorAdapter('a')};

    .item {
      font-size: ${fontSizeAdapter('xs')};
      line-height: calc(${fontSizeAdapter('xs')} * 1.5);
      opacity: 0;
      animation: show ${microinteractionAdapter(3)} ease-out forwards;

      @keyframes show {
        to {
          opacity: 1;
        }
      }
    }
  }
`
