import styled from 'styled-components'
import {
  colorAdapter,
  fontSizeAdapter,
  microinteractionAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'

interface NavStyleProvider {
  left: string
  backgroundColor: string
  boxShadow: string
}

export const navStyleAdapter = (darkMode: boolean, show: boolean): NavStyleProvider => {
  // #region Auxiliary vars

  // #endregion

  return {
    left: show
      ? '0'
      : `calc((${notFontSizeAdapter('2xs')} * 3 + ${fontSizeAdapter(
          's'
        )} * 2 + ${fontSizeAdapter('m')}) * -1)`,
    backgroundColor: colorAdapter(darkMode ? 'g-15' : 'g-2'),
    boxShadow: shadowAdapter(show ? 3 : 2),
  }
}

export const StylizedNav = styled.div<{ p: NavStyleProvider }>`
  position: fixed;
  left: ${({ p }) => p.left};
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: ${notFontSizeAdapter('2xs')};
  background-color: ${({ p }) => p.backgroundColor};
  box-shadow: ${({ p }) => p.boxShadow};
  transition: left ${microinteractionAdapter(2)} ease-out,
    background-color ${microinteractionAdapter(2)} ease-out,
    box-shadow ${microinteractionAdapter(2)} ease-out;

  .items {
    display: flex;
    flex-direction: column;
    gap: ${notFontSizeAdapter('2xs')};
    margin: 0;
    padding: 0;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    gap: ${notFontSizeAdapter('2xs')};
  }

  @media (min-width: 90rem) {
    left: 0;
  }
`
