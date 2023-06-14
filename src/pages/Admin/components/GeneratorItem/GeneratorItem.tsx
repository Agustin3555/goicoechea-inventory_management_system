import { ButtonRemove } from './components'

const Item = ({
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

export default Item
