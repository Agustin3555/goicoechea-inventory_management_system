import { ReactNode } from 'react'
import { panelStyleAdapter, PanelStyleProps, StylizedPanel } from './Panel.styled'

const Panel = ({ children, style }: { children?: ReactNode; style?: PanelStyleProps }) => (
  <StylizedPanel p={panelStyleAdapter(style)}>{children}</StylizedPanel>
)

export default Panel
