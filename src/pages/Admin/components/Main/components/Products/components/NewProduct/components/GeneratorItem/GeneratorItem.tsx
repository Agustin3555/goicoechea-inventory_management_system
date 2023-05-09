import ButtonRemove from '../ButtonRemove/ButtonRemove'

const GeneratorItem = ({
  fieldGroup,
  handleRemove,
}: {
  fieldGroup: JSX.Element
  handleRemove: () => void
}) => {
  return (
    <div className="generator-item">
      {fieldGroup}
      <ButtonRemove handleClick={handleRemove} />
    </div>
  )
}

export default GeneratorItem
