import { FieldGroupStyled } from './FieldGroup.styled'

const FieldGroup = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <FieldGroupStyled.Component p={FieldGroupStyled.adapter()}>
      {children}
    </FieldGroupStyled.Component>
  )
}

export default FieldGroup
