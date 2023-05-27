import { InputSelectorField } from '../../../../..'
import FieldGroup from '../FieldGroup/FieldGroup'
import { StringFields, propsInCommon } from '../../tools'
import { AppError } from '@/tools'
import { css } from 'styled-components'
import { useMemo } from 'react'
import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import { ProductServices } from '@/pages/Admin/services'
import { NOT_FONT_SIZE } from '@/styles'
import { DEPENDENCY_TYPE } from '@/pages/Admin/hooks'

const StringFieldGroup = ({ index }: { index: number }) => {
  const keyFieldKey = useMemo(() => StringFields.getKey(index), [])
  const valueFieldKey = useMemo(() => StringFields.getValue(index), [])

  const propsInCommonCalculated = {
    fieldDependency: [{ type: DEPENDENCY_TYPE.new, fieldKey: keyFieldKey }],
  }

  const keyFieldState = useSelector((store: AppStore) => {
    const value = store.newResourceData[propsInCommon.sectionKey]?.[keyFieldKey]
    return typeof value !== 'string' && value === undefined ? value : String(value)
  })

  const keyLoadOptions = async () => {
    const suggestions = await ProductServices.getStringCharSuggestions({
      field: 'KEY',
    })

    if (!suggestions || suggestions instanceof AppError) return suggestions as AppError

    return suggestions.map(item => ({
      id: item as string,
      title: item as string,
    }))
  }

  const valueLoadOptions = async () => {
    const suggestions = await ProductServices.getStringCharSuggestions({
      key: keyFieldState,
      field: 'VALUE',
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
        {...propsInCommonCalculated}
        fieldKey={valueFieldKey}
        title="Valor"
        required
        loadOptions={valueLoadOptions}
        style={{
          styled: css`
            width: ${NOT_FONT_SIZE['3xl']};
          `,
        }}
      />
    </FieldGroup>
  )
}

export default StringFieldGroup
