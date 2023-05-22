import { FONT_SIZE } from '@/styles'
import styled from 'styled-components'

export namespace InputFieldStyled {
  export const Component = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${FONT_SIZE.xs};
  `
}
