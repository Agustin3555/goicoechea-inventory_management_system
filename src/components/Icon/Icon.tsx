import { iconStyleAdapter, StylizedIcon, IconStyleProps } from './Icon.styled'

const Icon = ({ iconName, styleProps }: { iconName: string; styleProps?: IconStyleProps }) => {
  return (
    <StylizedIcon p={iconStyleAdapter(styleProps)}>
      <i className={`icon ${iconName}`} />
    </StylizedIcon>
  )
}

export default Icon
