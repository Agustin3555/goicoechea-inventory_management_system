import styled, { FlattenSimpleInterpolation } from 'styled-components'
import { FONT_SIZE, FontSize, MICROINTERACTION, NotFontSize, Value } from '@/styles'

interface NormalizedProps {
  size: FontSize | NotFontSize
}

interface Provider {
  width: Value
  height: Value
  icon: {
    fontSize: Value
  }
  styled?: FlattenSimpleInterpolation
}

export namespace IconStyled {
  export interface Props {
    size?: FontSize | NotFontSize
    styled?: FlattenSimpleInterpolation
  }

  export const adapter = (style?: Props): Provider => {
    const normalizedProps: NormalizedProps = {
      size: style?.size || FONT_SIZE.xs,
    }

    // #region Auxiliary vars

    const size = normalizedProps.size
    const dimensions = size === FONT_SIZE.xs ? FONT_SIZE['2xs'] : size

    // #endregion

    return {
      width: dimensions,
      height: dimensions,
      icon: {
        fontSize: size,
      },
      styled: style?.styled,
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ p }) => p.width};
    height: ${({ p }) => p.height};

    .icon {
      font-size: ${({ p }) => p.icon.fontSize};
      transition: color ${MICROINTERACTION.s} ease-out;
    }

    ${({ p }) => p.styled};
  `
}
