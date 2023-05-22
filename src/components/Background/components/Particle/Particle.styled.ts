import { COLOR, Color, NOT_FONT_SIZE, NotFontSize, Value, shadowAdapter } from '@/styles'
import styled, { FlattenSimpleInterpolation, css } from 'styled-components'

const MAX_CENTER_OFFSET = 128
const MIN_DURATION = 30
const MAX_DURATION = 60

const DIMENSIONS: NotFontSize[] = [
  NOT_FONT_SIZE.s,
  NOT_FONT_SIZE.m,
  NOT_FONT_SIZE.l,
  NOT_FONT_SIZE.xl,
]

const BORDER_WIDTH: NotFontSize[] = [
  NOT_FONT_SIZE['5xs'],
  NOT_FONT_SIZE['4xs'],
  NOT_FONT_SIZE['3xs'],
  NOT_FONT_SIZE['2xs'],
]

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min

interface Provider {
  left: Value
  width: Value
  height: Value
  style: FlattenSimpleInterpolation
  animation: Value
}

export namespace ParticleStyled {
  export interface Props {
    xPosition: number
  }

  export const adapter = (style: Props, darkMode: boolean): Provider => {
    // #region Auxiliary vars

    const { xPosition } = style

    let centerOffset = getRandomInt(0, MAX_CENTER_OFFSET)

    if (getRandomInt(0, 1) === 0) centerOffset *= -1

    const dimensions = DIMENSIONS[getRandomInt(0, DIMENSIONS.length)]

    const colors: Color[] = [COLOR.a, darkMode ? COLOR.g_0 : COLOR.g_14]

    const color = colors[getRandomInt(0, colors.length)]

    const styles: FlattenSimpleInterpolation[] = [
      css`
        border-width: ${BORDER_WIDTH[getRandomInt(0, BORDER_WIDTH.length)]};
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
      animation: `lava ${duration}s ease-in infinite alternate`,
    }
  }

  export const Component = styled.div<{ p: Provider }>`
    position: absolute;
    left: ${({ p }) => p.left};
    width: ${({ p }) => p.width};
    height: ${({ p }) => p.height};
    border-radius: ${NOT_FONT_SIZE['2xs']};
    box-shadow: ${shadowAdapter(1)};
    ${({ p }) => p.style}
    animation: ${({ p }) => p.animation};

    @keyframes lava {
      0% {
        bottom: calc(${DIMENSIONS.at(-1)} * -1);
        transform: rotate(0);
      }
      100% {
        bottom: calc(100% + ${DIMENSIONS.at(-1)});
        transform: rotate(360deg);
      }
    }
  `
}
