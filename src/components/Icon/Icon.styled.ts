import styled, { FlattenSimpleInterpolation } from 'styled-components'
import { FontSize, fontSizeAdapter, microinteractionAdapter } from '@/styles'

export interface IconStyleProps {
  size?: FontSize
  styled?: FlattenSimpleInterpolation
}

interface IconNormalizedStyleProps {
  size: FontSize
}

interface IconStyleProvider {
  width: string
  height: string
  icon: {
    fontSize: string
  }
  styled?: FlattenSimpleInterpolation
}

export const iconStyleAdapter = (style?: IconStyleProps): IconStyleProvider => {
  const normalizedProps: IconNormalizedStyleProps = {
    size: style?.size || 'xs',
  }

  // #region Auxiliary vars

  const size = fontSizeAdapter(normalizedProps.size)

  // #endregion

  return {
    width: size,
    height: size,
    icon: {
      fontSize: size,
    },
    styled: style?.styled,
  }
}

export const StylizedIcon = styled.div<{ p: IconStyleProvider }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ p }) => p.width};
  height: ${({ p }) => p.height};

  .icon {
    font-size: ${({ p }) => p.icon.fontSize};
    transition: color ${microinteractionAdapter(2)} ease-out;
  }

  ${({ p }) => p.styled};
`
