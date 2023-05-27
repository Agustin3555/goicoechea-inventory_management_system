import { QuantityFieldGroup } from '../../..'
import { QuantityFields } from '../../../../tools'
import { useFieldGroupGenerator } from '../../hooks'
import Generator from '../Generator/Generator'
import GeneratorItem from '../GeneratorItem/GeneratorItem'

const QuantityFieldGroupGenerator = () => {
  const { items, addButtonHandleClick, clearField, removeItem } = useFieldGroupGenerator()

  return (
    <Generator title="Características por cantidad" handleAdd={addButtonHandleClick}>
      {items.map(index => (
        <GeneratorItem
          key={index}
          fieldGroup={<QuantityFieldGroup index={index} />}
          handleRemove={() => {
            const keyFieldKey = QuantityFields.getKey(index)
            const valueFieldKey = QuantityFields.getValue(index)
            const metricUnitFieldKey = QuantityFields.getMetricUnit(index)

            clearField(keyFieldKey)
            clearField(valueFieldKey)
            clearField(metricUnitFieldKey)

            removeItem(index)
          }}
        />
      ))}
    </Generator>
  )
}

export default QuantityFieldGroupGenerator
