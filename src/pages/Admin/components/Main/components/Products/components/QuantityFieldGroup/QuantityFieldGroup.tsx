import { InputSelectorField } from '../../../../..'
import FieldGroup from '../FieldGroup/FieldGroup'
import { QuantityFields, propsInCommon } from '../../tools'
import { AppError } from '@/tools'
import { css } from 'styled-components'
import { notFontSizeAdapter } from '@/styles'
import { useMemo } from 'react'
import { ProductServices } from '@/pages/Admin/services'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'

const QuantityFieldGroup = ({ index }: { index: number }) => {
  const keyFieldKey = useMemo(() => QuantityFields.getKey(index), [])
  const valueFieldKey = useMemo(() => QuantityFields.getValue(index), [])
  const metricUnitFieldKey = useMemo(() => QuantityFields.getMetricUnit(index), [])

  const keyFieldState: string | undefined = useSelector(
    (store: AppStore) => store.newResourceData[propsInCommon.sectionKey][keyFieldKey]
  )

  const keyLoadOptions = async () => {
    const suggestions = await ProductServices.getQuantityCharSuggestions({
      field: 'KEY',
    })

    if (!suggestions || suggestions instanceof AppError) return suggestions as AppError

    return suggestions.map(item => ({
      id: item as string,
      title: item as string,
    }))
  }

  const valueLoadOptions = async () => {
    const suggestions = await ProductServices.getQuantityCharSuggestions({
      // TODO: hacer que se vuelva a actualisar la peticion cuando keyFieldState este disponible
      key: keyFieldState,
      field: 'VALUE',
    })

    if (!suggestions || suggestions instanceof AppError) return suggestions as AppError

    return suggestions.map(item => ({
      id: item.toString(),
      title: item.toString(),
    }))
  }

  const metricUnitLoadOptions = async () => {
    const suggestions = await ProductServices.getQuantityCharSuggestions({
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
            width: ${notFontSizeAdapter('3xl')};
          `,
        }}
      />
      <InputSelectorField
        {...propsInCommon}
        fieldKey={valueFieldKey}
        title="Valor"
        inputExtraAttrs={{
          type: 'number',
        }}
        required
        loadOptions={valueLoadOptions}
        style={{
          styled: css`
            width: ${notFontSizeAdapter('2xl')};
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
            width: ${notFontSizeAdapter('xl')};
          `,
        }}
      />
    </FieldGroup>
  )
}

export default QuantityFieldGroup
