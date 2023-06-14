import styled, { FlattenSimpleInterpolation } from 'styled-components'
import {
  Color,
  colorAdapter,
  FontSize,
  MICROINTERACTION,
  NOT_FONT_SIZE,
  NotFontSize,
  Value,
} from '@/styles'

type Long = 'expanded' | NotFontSize | FontSize

interface NormalizedProps {
  long: Long
  thickness: NotFontSize | FontSize
  invert: boolean
  backgroundColor: {
    dark: Color
    bright: Color
  }
}

interface Provider {
  width: Value
  height: Value
  backgroundColor: Value
  styled?: FlattenSimpleInterpolation
}

export namespace SeparatorStyled {
  export interface Props {
    long?: Long
    thickness?: NotFontSize | FontSize
    invert?: boolean
    backgroundColor: {
      dark: Color
      bright?: Color
    }
    styled?: FlattenSimpleInterpolation
  }

  export const adapter = (darkMode: boolean, style: Props): Provider => {
    const normalizedProps: NormalizedProps = {
      long: style.long || 'expanded',
      thickness: style.thickness || NOT_FONT_SIZE['6xs'],
      invert: style.invert || false,
      backgroundColor: {
        dark: style.backgroundColor.dark,
        bright: style.backgroundColor.bright || style.backgroundColor.dark,
      },
    }

    // #region Auxiliary vars

    const long = normalizedProps.long === 'expanded' ? '100%' : normalizedProps.long

    // #endregion

    return {
      width: normalizedProps.invert ? long : normalizedProps.thickness,
      height: normalizedProps.invert ? normalizedProps.thickness : long,
      backgroundColor: colorAdapter(
        darkMode
          ? normalizedProps.backgroundColor.dark
          : normalizedProps.backgroundColor.bright
      ),
      styled: style?.styled,
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    width: ${({ p }) => p.width};
    height: ${({ p }) => p.height};
    border-radius: ${NOT_FONT_SIZE['6xl']};
    background-color: ${({ p }) => p.backgroundColor};
    transition: background-color ${MICROINTERACTION.s} ease-out;

    ${({ p }) => p.styled};
  `
}
