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
      : `calc((${fontSizeAdapter('xs')} * 3 + ${fontSizeAdapter('s')} * 2 + ${fontSizeAdapter(
          'm'
        )}) * -1)`,
    backgroundColor: colorAdapter(darkMode ? 'g-15' : 'g-2'),
    boxShadow: shadowAdapter(show ? 3 : 2),
  }
}

export const StylizedNav = styled.div<{ p: NavStyleProvider }>`
  position: absolute;
  top: 0;
  left: ${({ p }) => p.left};
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: ${fontSizeAdapter('xs')};
  border-radius: calc(${notFontSizeAdapter('4xs')} + ${fontSizeAdapter('xs')});
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: ${({ p }) => p.backgroundColor};
  box-shadow: ${({ p }) => p.boxShadow};
  transition: inset ${microinteractionAdapter(2)} ease-out,
    background-color ${microinteractionAdapter(2)} ease-out,
    box-shadow ${microinteractionAdapter(2)} ease-out;

  .items {
    display: flex;
    flex-direction: column;
    gap: ${fontSizeAdapter('xs')};
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    gap: ${fontSizeAdapter('xs')};
  }

  @media (min-width: 90rem) {
    left: 0;
    top: ${fontSizeAdapter('xs')};
    height: calc(100% - ${fontSizeAdapter('xs')} * 2);
  }
`
