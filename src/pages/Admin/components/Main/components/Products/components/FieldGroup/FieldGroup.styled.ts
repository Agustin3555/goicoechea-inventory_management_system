import styled from 'styled-components'
import { fontSizeAdapter } from '@/styles'

interface FieldGroupStyleProvider {}

export const fieldGroupAdapter = (): FieldGroupStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {}
}

export const StylizedFieldGroup = styled.form<{ p: FieldGroupStyleProvider }>`
  display: flex;
  gap: ${fontSizeAdapter('xs')};
`
