import { StylizedFieldGroup, fieldGroupAdapter } from './FieldGroup.styled'

const FieldGroup = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <StylizedFieldGroup p={fieldGroupAdapter()}>{children}</StylizedFieldGroup>
}

export default FieldGroup
