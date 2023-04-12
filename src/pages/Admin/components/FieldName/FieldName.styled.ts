import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

interface FieldNameStyleProvider {
  color: string
}

export const fieldNameStyleAdapter = (darkMode: boolean): FieldNameStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {
    color: colorAdapter(darkMode ? 'g-4' : 'g-12'),
  }
}

export const StylizedFieldName = styled.span<{ p: FieldNameStyleProvider }>`
  display: block;
  font-size: ${fontSizeAdapter('xs')};
  line-height: ${fontSizeAdapter('xs')};
  color: ${({ p }) => p.color};
  transition: color ${microinteractionAdapter(2)} ease-out;
`
