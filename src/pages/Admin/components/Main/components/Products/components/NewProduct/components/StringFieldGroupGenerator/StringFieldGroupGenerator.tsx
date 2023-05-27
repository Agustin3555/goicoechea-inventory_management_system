import { StringFieldGroup } from '../../..'
import { StringFields } from '../../../../tools'
import { useFieldGroupGenerator } from '../../hooks'
import Generator from '../Generator/Generator'
import GeneratorItem from '../GeneratorItem/GeneratorItem'

const StringFieldGroupGenerator = () => {
  const { items, addButtonHandleClick, clearField, removeItem } = useFieldGroupGenerator()

  return (
    <Generator title="Características por texto" handleAdd={addButtonHandleClick}>
      {items.map(index => (
        <GeneratorItem
          key={index}
          fieldGroup={<StringFieldGroup index={index} />}
          handleRemove={() => {
            const keyFieldKey = StringFields.getKey(index)
            const valueFieldKey = StringFields.getValue(index)

            clearField(keyFieldKey)
            clearField(valueFieldKey)

            removeItem(index)
          }}
        />
      ))}
    </Generator>
  )
}

export default StringFieldGroupGenerator
