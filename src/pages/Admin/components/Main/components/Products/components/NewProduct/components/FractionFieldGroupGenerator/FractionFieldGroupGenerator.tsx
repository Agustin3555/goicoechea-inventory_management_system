import { FractionFieldGroup } from '../../..'
import { FractionFields } from '../../../../tools'
import { useFieldGroupGenerator } from '../../hooks'
import Generator from '../Generator/Generator'
import GeneratorItem from '../GeneratorItem/GeneratorItem'

const FractionFieldGroupGenerator = () => {
  const { items, addButtonHandleClick, clearField, removeItem } = useFieldGroupGenerator()

  return (
    <Generator title="Características por fracción" handleAdd={addButtonHandleClick}>
      {items.map(index => (
        <GeneratorItem
          key={index}
          fieldGroup={<FractionFieldGroup index={index} />}
          handleRemove={() => {
            const keyFieldKey = FractionFields.getKey(index)
            const numeratorValueFieldKey = FractionFields.getNumeratorValue(index)
            const denominatorValueFieldKey = FractionFields.getDenominatorValue(index)
            const metricUnitFieldKey = FractionFields.getMetricUnit(index)

            clearField(keyFieldKey)
            clearField(numeratorValueFieldKey)
            clearField(denominatorValueFieldKey)
            clearField(metricUnitFieldKey)

            removeItem(index)
          }}
        />
      ))}
    </Generator>
  )
}

export default FractionFieldGroupGenerator
