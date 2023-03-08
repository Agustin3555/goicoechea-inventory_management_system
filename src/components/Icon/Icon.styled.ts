import styled from 'styled-components'
import { FontSize, fontSizeAdapter, microinteractionAdapter } from '@/styles'

export interface IconStyleProps {
  size?: FontSize
}

interface IconNormalizedStyleProps {
  size: FontSize
}

interface IconStyleProvider {
  this: {
    width: string
    height: string
  }
  icon: {
    fontSize: string
  }
}

export const iconStyleAdapter = (props?: IconStyleProps): IconStyleProvider => {
  const normalizedProps: IconNormalizedStyleProps = {
    size: props?.size || 'xs',
  }

  // #region Auxiliary vars

  const size = fontSizeAdapter(normalizedProps.size)

  // #endregion

  return {
    this: {
      width: size,
      height: size,
    },
    icon: {
      fontSize: size,
    },
  }
}

export const StylizedIcon = styled.div<{ p: IconStyleProvider }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ p }) => p.this.width};
  height: ${({ p }) => p.this.height};

  .icon {
    font-size: ${({ p }) => p.icon.fontSize};
    transition-property: color;
    transition-duration: ${microinteractionAdapter(2)};
    transition-timing-function: ease-out;
  }
`
