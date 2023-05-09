import { InputSelectorField } from '../../../../../'
import FieldGroup from '../FieldGroup/FieldGroup'
import { getComplexFieldKey, propsInCommon } from '../../tools'
import { AppError } from '@/tools'
import { css } from 'styled-components'
import { notFontSizeAdapter } from '@/styles'
import { useMemo } from 'react'
import { ProductServices } from '@/pages/Admin/services'

const BooleanFieldGroup = ({ index }: { index: number }) => {
  const keysInCommon = useMemo(() => ['booleanChars', index], [])

  return (
    <FieldGroup>
      <InputSelectorField
        {...propsInCommon}
        fieldKey={getComplexFieldKey(...keysInCommon, 'key')}
        title="Nombre"
        required
        loadOptions={async () => {
          const suggestions = await ProductServices.getBooleanCharSuggestions({
            field: 'KEY',
          })

          if (!suggestions || suggestions instanceof AppError) return suggestions as AppError

          return suggestions.map(item => ({
            id: item as string,
            title: item as string,
          }))
        }}
        style={{
          styled: css`
            width: ${notFontSizeAdapter('3xl')};
          `,
        }}
      />
    </FieldGroup>
  )
}

export default BooleanFieldGroup
