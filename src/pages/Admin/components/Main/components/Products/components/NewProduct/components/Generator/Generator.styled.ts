import { COLOR, FONT_SIZE, MICROINTERACTION, NOT_FONT_SIZE } from '@/styles'
import styled from 'styled-components'

export namespace GeneratorStyled {
  export const Component = styled.form`
    display: flex;
    flex-direction: column;

    .generator-title {
      margin: ${FONT_SIZE.s} 0;
      font-size: ${FONT_SIZE.s};
      line-height: ${FONT_SIZE.s};
      color: ${COLOR.g_4};
    }

    .generator-container {
      display: flex;
      flex-direction: column;
      gap: ${FONT_SIZE.xs};
      padding: ${FONT_SIZE.xs};
      border-width: ${NOT_FONT_SIZE['6xs']};
      border-style: solid;
      border-color: ${COLOR.g_13};
      border-radius: ${NOT_FONT_SIZE['4xs']};

      .generator-item {
        display: flex;
        gap: ${FONT_SIZE.xs};
      }

      .add-button-content {
        display: flex;
        gap: ${FONT_SIZE.xs};
        color: ${COLOR.g_4};
        transition: color ${MICROINTERACTION.s} ease-out;
      }
    }
  `
}
