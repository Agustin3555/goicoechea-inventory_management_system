import { IconStyled } from './Icon.styled'

const Icon = ({ iconName, style }: { iconName: string; style?: IconStyled.Props }) => {
  return (
    <IconStyled.Component p={IconStyled.adapter(style)}>
      <i className={`icon ${iconName}`} />
    </IconStyled.Component>
  )
}

export default Icon
