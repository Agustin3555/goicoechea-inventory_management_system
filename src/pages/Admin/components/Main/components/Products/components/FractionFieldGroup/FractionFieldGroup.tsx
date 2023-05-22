import { InputSelectorField } from '../../../../..'
import FieldGroup from '../FieldGroup/FieldGroup'
import { FractionFields, propsInCommon } from '../../tools'
import { AppError } from '@/tools'
import { css } from 'styled-components'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import { ProductServices } from '@/pages/Admin/services'
import { NOT_FONT_SIZE } from '@/styles'

const FractionFieldGroup = ({ index }: { index: number }) => {
  const keyFieldKey = useMemo(() => FractionFields.getKey(index), [])
  const numeratorFieldKey = useMemo(() => FractionFields.getNumeratorValue(index), [])
  const denominatorFieldKey = useMemo(() => FractionFields.getDenominatorValue(index), [])
  const metricUnitFieldKey = useMemo(() => FractionFields.getMetricUnit(index), [])

  const keyFieldState: string | undefined = useSelector(
    (store: AppStore) => store.newResourceData[propsInCommon.sectionKey][keyFieldKey]
  )

  const keyLoadOptions = async () => {
    const suggestions = await ProductServices.getFractionCharSuggestions({
      field: 'KEY',
    })

    if (!suggestions || suggestions instanceof AppError) return suggestions as AppError

    return suggestions.map(item => ({
      id: item as string,
      title: item as string,
    }))
  }

  const numeratorValueLoadOptions = async () => {
    const suggestions = await ProductServices.getFractionCharSuggestions({
      key: keyFieldState,
      field: 'NUMERATOR_VALUE',
    })

    if (!suggestions || suggestions instanceof AppError) return suggestions as AppError

    return suggestions.map(item => ({
      id: item.toString(),
      title: item.toString(),
    }))
  }

  const denominatorValueLoadOptions = async () => {
    const suggestions = await ProductServices.getFractionCharSuggestions({
      key: keyFieldState,
      field: 'DENOMINATOR_VALUE',
    })

    if (!suggestions || suggestions instanceof AppError) return suggestions as AppError

    return suggestions.map(item => ({
      id: item.toString(),
      title: item.toString(),
    }))
  }

  const metricUnitLoadOptions = async () => {
    const suggestions = await ProductServices.getFractionCharSuggestions({
      key: keyFieldState,
      field: 'METRIC_UNIT',
    })

    if (!suggestions || suggestions instanceof AppError) return suggestions as AppError

    return suggestions.map(item => ({
      id: item as string,
      title: item as string,
    }))
  }

  return (
    <FieldGroup>
      <InputSelectorField
        {...propsInCommon}
        fieldKey={keyFieldKey}
        title="Nombre"
        required
        loadOptions={keyLoadOptions}
        style={{
          styled: css`
            width: ${NOT_FONT_SIZE['3xl']};
          `,
        }}
      />
      <InputSelectorField
        {...propsInCommon}
        fieldKey={numeratorFieldKey}
        title="Numerador"
        inputExtraAttrs={{
          type: 'number',
        }}
        required
        loadOptions={numeratorValueLoadOptions}
        style={{
          styled: css`
            width: ${NOT_FONT_SIZE.xl};
          `,
        }}
      />
      <InputSelectorField
        {...propsInCommon}
        fieldKey={denominatorFieldKey}
        title="Denominador"
        inputExtraAttrs={{
          type: 'number',
        }}
        required
        loadOptions={denominatorValueLoadOptions}
        style={{
          styled: css`
            width: ${NOT_FONT_SIZE.xl};
          `,
        }}
      />
      <InputSelectorField
        {...propsInCommon}
        fieldKey={metricUnitFieldKey}
        title="Unidad Métrica"
        loadOptions={metricUnitLoadOptions}
        style={{
          styled: css`
            width: ${NOT_FONT_SIZE.xl};
          `,
        }}
      />
    </FieldGroup>
  )
}

export default FractionFieldGroup
