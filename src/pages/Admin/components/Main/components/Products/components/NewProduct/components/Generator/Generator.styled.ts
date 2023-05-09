import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
} from '@/styles'

export const StylizedGenerator = styled.form`
  display: flex;
  flex-direction: column;

  .generator-title {
    margin: ${fontSizeAdapter('s')} 0;
    font-size: ${fontSizeAdapter('s')};
    line-height: ${fontSizeAdapter('s')};
    color: ${colorAdapter('g-4')};
  }

  .generator-container {
    display: flex;
    flex-direction: column;
    gap: ${fontSizeAdapter('xs')};
    padding: ${fontSizeAdapter('xs')};
    border-width: ${notFontSizeAdapter('6xs')};
    border-style: solid;
    border-color: ${colorAdapter('g-13')};
    border-radius: ${notFontSizeAdapter('4xs')};

    .generator-item {
      display: flex;
      gap: ${fontSizeAdapter('xs')};
    }

    .add-button-content {
      display: flex;
      gap: ${fontSizeAdapter('xs')};
      color: ${colorAdapter('g-4')};
      transition: color ${microinteractionAdapter(2)} ease-out;

      .text {
        font-size: ${fontSizeAdapter('xs')};
        line-height: ${fontSizeAdapter('xs')};
      }
    }
  }
`
