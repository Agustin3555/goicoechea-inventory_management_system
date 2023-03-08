import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

interface SinglePageOnCardStyleProvider {
  card: {
    backgroundColor: string
    title: {
      color: string
    }
  }
}

export const singlePageOnCardStyleAdapter = (
  darkMode: boolean
): SinglePageOnCardStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {
    card: {
      backgroundColor: colorAdapter(darkMode ? 'g-15' : 'g-0'),
      title: {
        color: colorAdapter(darkMode ? 'g-2' : 'g-12'),
      },
    },
  }
}

export const StylizedSinglePageOnCard = styled.div<{ p: SinglePageOnCardStyleProvider }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: ${notFontSizeAdapter('xs')};

  .card {
    display: flex;
    flex-direction: column;
    gap: calc(${notFontSizeAdapter('m')} * 2);
    width: calc(${notFontSizeAdapter('4xl')} - ${notFontSizeAdapter('xl')});
    padding: ${notFontSizeAdapter('m')};
    background-color: ${({ p }) => p.card.backgroundColor};
    border-radius: ${notFontSizeAdapter('2xs')};
    box-shadow: ${shadowAdapter(2)};
    transition: background-color ${microinteractionAdapter(2)} ease-out;

    .title {
      font-size: ${fontSizeAdapter('l')};
      line-height: ${fontSizeAdapter('l')};
      font-weight: 700;
      color: ${({ p }) => p.card.title.color};
      transition: color ${microinteractionAdapter(2)} ease-out;
    }
  }

  .dark-mode-container {
    position: absolute;
    left: ${notFontSizeAdapter('xs')};
    bottom: ${notFontSizeAdapter('xs')};
  }
`
