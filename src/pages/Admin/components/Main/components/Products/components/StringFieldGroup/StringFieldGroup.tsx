import { InputSelectorField } from '../../../../..'
import FieldGroup from '../FieldGroup/FieldGroup'
import { StringFields, propsInCommon } from '../../tools'
import { AppError } from '@/tools'
import { css } from 'styled-components'
import { notFontSizeAdapter } from '@/styles'
import { useMemo } from 'react'
import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import { ProductServices } from '@/pages/Admin/services'

const StringFieldGroup = ({ index }: { index: number }) => {
  const keyFieldKey = useMemo(() => StringFields.getKey(index), [])
  const valueFieldKey = useMemo(() => StringFields.getValue(index), [])

  const keyFieldState: string | undefined = useSelector(
    (store: AppStore) => store.newResourceData[propsInCommon.sectionKey][keyFieldKey]
  )

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
            width: ${notFontSizeAdapter('3xl')};
          `,
        }}
      />
      <InputSelectorField
        {...propsInCommon}
        fieldKey={valueFieldKey}
        title="Valor"
        required
        loadOptions={valueLoadOptions}
        style={{
          styled: css`
            width: ${notFontSizeAdapter('3xl')};
          `,
        }}
      />
    </FieldGroup>
  )
}

export default StringFieldGroup
