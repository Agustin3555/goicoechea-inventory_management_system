import {
  Color,
  Elevation,
  NotFontSize,
  colorAdapter,
  notFontSizeAdapter,
  shadowAdapter,
} from '@/styles'
import styled, { FlattenSimpleInterpolation, css } from 'styled-components'

const MAX_CENTER_OFFSET = 128
const MIN_DURATION = 30
const MAX_DURATION = 60
const DIMENSIONS: NotFontSize[] = ['xs', 's', 'm', 'l', 'xl']
const BORDER_WIDTH: NotFontSize[] = ['5xs', '4xs', '3xs', '2xs']

export interface ParticleStyleProps {
  xPosition: number
}

interface ParticleStyleProvider {
  left: string
  width: string
  height: string
  style: FlattenSimpleInterpolation
  animation: string
}

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min

export const particleStyleAdapter = (
  style: ParticleStyleProps,
  darkMode: boolean
): ParticleStyleProvider => {
  // #region Auxiliary vars

  const { xPosition } = style

  let centerOffset = getRandomInt(0, MAX_CENTER_OFFSET)

  if (getRandomInt(0, 1) === 0) centerOffset *= -1

  const dimensions = notFontSizeAdapter(DIMENSIONS[getRandomInt(0, DIMENSIONS.length)])

  const colors: Color[] = ['a', darkMode ? 'g-0' : 'g-14']

  const color = colorAdapter(colors[getRandomInt(0, colors.length)])

  const styles: FlattenSimpleInterpolation[] = [
    css`
      border-width: ${notFontSizeAdapter(BORDER_WIDTH[getRandomInt(0, BORDER_WIDTH.length)])};
      border-style: solid;
      border-color: ${color};
    `,
    css`
      background-color: ${color};
    `,
  ]

  const duration = getRandomInt(MIN_DURATION, MAX_DURATION)

  // #endregion

  return {
    left: `${xPosition + centerOffset}px`,
    width: dimensions,
    height: dimensions,
    style: styles[getRandomInt(0, styles.length)],
    animation: `move ${duration}s ease-in infinite alternate`,
  }
}

export const StylizedParticle = styled.div<{ p: ParticleStyleProvider }>`
  position: absolute;
  left: ${({ p }) => p.left};
  width: ${({ p }) => p.width};
  height: ${({ p }) => p.height};
  border-radius: ${notFontSizeAdapter('2xs')};
  box-shadow: ${shadowAdapter(1)};
  ${({ p }) => p.style}
  animation: ${({ p }) => p.animation};

  @keyframes move {
    0% {
      bottom: calc(${notFontSizeAdapter(DIMENSIONS.at(-1) as NotFontSize)} * -1);
      transform: rotate(0);
    }
    100% {
      bottom: calc(100% + ${notFontSizeAdapter(DIMENSIONS.at(-1) as NotFontSize)});
      transform: rotate(360deg);
    }
  }
`
