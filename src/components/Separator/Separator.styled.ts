import styled from 'styled-components'
import {
  Color,
  colorAdapter,
  fontSizeAdapter,
  insetBorderAdapter,
  microinteractionAdapter,
  NotFontSize,
  notFontSizeAdapter,
} from '@/styles'

type SeparatorFontSize = 'xs' | 's'
type SeparatorLongProp = 'expanded' | NotFontSize

export interface SeparatorStyleProps {
  long?: SeparatorLongProp
  invert?: boolean
  backgroundColor: {
    dark: Color
    bright?: Color
  }
}

interface SeparatorNormalizedStyleProps {
  long: SeparatorLongProp
  invert: boolean
  backgroundColor: {
    dark: Color
    bright: Color
  }
}

interface SeparatorStyleProvider {
  width: string
  height: string
  backgroundColor: string
}

export const separatorStyleAdapter = (
  darkMode: boolean,
  style: SeparatorStyleProps
): SeparatorStyleProvider => {
  const normalizedProps: SeparatorNormalizedStyleProps = {
    long: style.long || 'expanded',
    invert: style.invert || false,
    backgroundColor: {
      dark: style.backgroundColor.dark,
      bright: style.backgroundColor.bright || style.backgroundColor.dark,
    },
  }

  // #region Auxiliary vars

  const thickness = notFontSizeAdapter('6xs')
  const long =
    normalizedProps.long === 'expanded' ? '100%' : notFontSizeAdapter(normalizedProps.long)

  // #endregion

  return {
    width: normalizedProps.invert ? long : thickness,
    height: normalizedProps.invert ? thickness : long,
    backgroundColor: colorAdapter(
      darkMode ? normalizedProps.backgroundColor.dark : normalizedProps.backgroundColor.bright
    ),
  }
}

export const StylizedSeparator = styled.div<{ p: SeparatorStyleProvider }>`
  width: ${({ p }) => p.width};
  height: ${({ p }) => p.height};
  border-radius: ${notFontSizeAdapter('6xl')};
  background-color: ${({ p }) => p.backgroundColor};
  transition: background-color ${microinteractionAdapter(2)} ease-out;
`
