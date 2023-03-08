import styled from 'styled-components'
import { colorAdapter, fontSizeAdapter, notFontSizeAdapter } from '@/styles'

interface NotFoundStyleProvider {
  content: {
    description: {
      color: string
    }
  }
}

export const notFoundStyleAdapter = (darkMode: boolean): NotFoundStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {
    content: {
      description: {
        color: colorAdapter(darkMode ? 'g-4' : 'g-16'),
      },
    },
  }
}

export const StylizedNotFound = styled.div<{ p: NotFoundStyleProvider }>`
  width: 100%;
  height: 100%;

  .content {
    display: flex;
    flex-direction: column;
    gap: calc(${notFontSizeAdapter('m')} * 2);

    .description {
      line-height: calc(${fontSizeAdapter('s')} * 1.5);
      color: ${({ p }) => p.content.description.color};
    }

    .button-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: ${fontSizeAdapter('s')};
      height: ${fontSizeAdapter('s')};
      color: ${colorAdapter('g-0')};
    }
  }
`
