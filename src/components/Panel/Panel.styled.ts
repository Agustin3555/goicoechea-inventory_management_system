import styled from 'styled-components'
import {
  Elevation,
  shadowAdapter,
  NotFontSize,
  notFontSizeAdapter,
  borderRadiusAdapter,
  insetBorderAdapter,
} from '@/styles'

export interface PanelStyleProps {
  padding?: NotFontSize
  borderRadius?: NotFontSize[]
  showBorder?: boolean[]
  elevation?: Elevation
}

interface PanelNormalizedStyleProps {
  padding: NotFontSize
  borderRadius: NotFontSize[]
  showBorder: boolean[]
  elevation: Elevation
}

interface PanelStyleProvider {
  padding: string
  borderRadius: string
  boxShadow: string
}

export const panelStyleAdapter = (style?: PanelStyleProps): PanelStyleProvider => {
  const normalizedProps: PanelNormalizedStyleProps = {
    padding: style?.padding || 0,
    borderRadius: style?.borderRadius || ['2xs'],
    showBorder: style?.showBorder || [true],
    elevation: style?.elevation || 0,
  }

  // #region Auxiliary vars

  // #endregion

  return {
    padding: notFontSizeAdapter(normalizedProps.padding),
    borderRadius: borderRadiusAdapter(...normalizedProps.borderRadius),
    boxShadow: shadowAdapter(normalizedProps.elevation),
  }
}

export const StylizedPanel = styled.div<{ p: PanelStyleProvider }>`
  position: relative;
  padding: ${({ p }) => p.padding};
  border-radius: ${({ p }) => p.borderRadius};
  box-shadow: ${({ p }) => p.boxShadow};
`
