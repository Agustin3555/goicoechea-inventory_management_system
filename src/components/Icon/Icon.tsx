import { iconStyleAdapter, StylizedIcon, IconStyleProps } from './Icon.styled'

const Icon = ({ iconName, style }: { iconName: string; style?: IconStyleProps }) => {
  return (
    <StylizedIcon p={iconStyleAdapter(style)}>
      <i className={`icon ${iconName}`} />
    </StylizedIcon>
  )
}

export default Icon
