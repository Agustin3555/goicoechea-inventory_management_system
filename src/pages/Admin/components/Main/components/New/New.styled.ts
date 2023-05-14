import styled from 'styled-components'
import { colorAdapter, fontSizeAdapter, microinteractionAdapter } from '@/styles'
import { GAP } from '@/tools'

interface NewStyleProvider {
  title: {
    color: string
  }
}

export const newStyleAdapter = (darkMode: boolean): NewStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {
    title: {
      color: colorAdapter(darkMode ? 'g-2' : 'g-14'),
    },
  }
}

export const StylizedNew = styled.form<{ p: NewStyleProvider }>`
  max-height: calc(100% - 53px - ${GAP});
  padding-right: ${GAP};
  overflow-y: scroll;
  overflow-x: hidden;

  .title {
    margin-top: ${GAP};
    margin-bottom: calc(${fontSizeAdapter('m')} * 2);
    font-size: ${fontSizeAdapter('m')};
    line-height: ${fontSizeAdapter('m')};
    font-weight: 500;
    color: ${({ p }) => p.title.color};
    transition: color ${microinteractionAdapter(2)} ease-out;
  }

  .fields {
    display: flex;
    flex-wrap: wrap;
    gap: ${GAP};
  }
`
