import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

interface TogglePanelProvider {
  buttonContent: {
    color: string
  }
}

export const togglePanelAdapter = (darkMode: boolean): TogglePanelProvider => {
  // #region Auxiliary vars

  return {
    buttonContent: {
      color: colorAdapter(darkMode ? 'g-4' : 'g-12'),
    },
  }
}

export const StylizedTogglePanel = styled.div<{ p: TogglePanelProvider }>`
  .button-content {
    display: flex;
    gap: ${fontSizeAdapter('s')};
    color: ${({ p }) => p.buttonContent.color};
    transition: color ${microinteractionAdapter(2)} ease-out;

    .text {
      font-size: ${fontSizeAdapter('xs')};
      line-height: ${fontSizeAdapter('xs')};
    }
  }

  @media (max-width: 48rem) {
    .button-content {
      .text {
        display: none;
      }
    }
  }
`
