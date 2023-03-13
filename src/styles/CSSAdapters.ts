import { getCSSVarValue } from './getCSSVarValue'
import {
  Color,
  Deg,
  Elevation,
  Font,
  Knob,
  FontSize,
  NotFontSize,
  Microinteraction,
} from './types'
import {
  colorVars,
  degVars,
  elevationVars,
  fontSizeVars,
  fontVars,
  knobVars,
  microinteractionVars,
  notFontSizeVars,
} from './typeVars'

export const fontAdapter = (value: Font) => {
  if (!fontVars.includes(value)) return ''

  return `var(--font-${value})`
}

export const fontSizeAdapter = (value: FontSize) => {
  if (!fontSizeVars.includes(value)) return ''

  return value === 0 ? '0' : `var(--size-font-${value})`
}

export const notFontSizeAdapter = (value: NotFontSize) => {
  if (!notFontSizeVars.includes(value)) return ''

  return value === 0 ? '0' : `var(--size-notFont-${value})`
}

export const colorAdapter = (value: Color, gap?: number) => {
  if (!colorVars.includes(value)) return ''

  if (gap && gap !== 0) {
    let index

    if (gap < 0) {
      const minGroupIndex = colorVars.indexOf(
        colorVars.filter(element => element.startsWith(value.substring(0, 1))).at(0) as string
      )

      index = colorVars.indexOf(value) + gap

      if (index < minGroupIndex) index = minGroupIndex
    } else {
      const maxGroupIndex = colorVars.indexOf(
        colorVars.filter(element => element.startsWith(value.substring(0, 1))).at(-1) as string
      )

      index = colorVars.indexOf(value) + gap

      if (maxGroupIndex < index) index = maxGroupIndex
    }

    value = colorVars[index] as Color
  }

  return `var(--color-${value})`
}

export const microinteractionAdapter = (value: Microinteraction) => {
  if (!microinteractionVars.includes(value)) return ''

  return `var(--time-microinteraction-${value})`
}

export const degAdapter = (value: Deg) => {
  if (!degVars.includes(value)) return ''

  return `${value}deg`
}

export const shadowAdapter = (value: Elevation, usefilter: boolean = false) => {
  if (!elevationVars.includes(value)) return ''

  if (value === 0) return ''

  if (usefilter) {
    const dropShadows = {
      1: [
        '0.3px 0.5px 0.7px rgba(0, 0, 0, 0.1)',
        '0.4px 0.8px 1px rgba(0, 0, 0, 0.1)',
        '1px 2px 2.5px rgba(0, 0, 0, 0.1)',
      ],
      2: [
        '0.3px 0.5px 0.7px rgba(0, 0, 0, 0.09)',
        '0.7px 1.3px 1.7px rgba(0, 0, 0, 0.09)',
        '1.3px 2.6px 3.3px rgba(0, 0, 0, 0.09)',
        '2.6px 5.2px 6.5px rgba(0, 0, 0, 0.09)',
        '5px 10px 12.6px rgba(0, 0, 0, 0.09)',
      ],
      3: [
        '0.3px 0.5px 0.7px rgba(0, 0, 0, 0.08)',
        '1.2px 2.4px 3px rgba(0, 0, 0, 0.08)',
        '2.1px 4.3px 5.4px rgba(0, 0, 0, 0.08)',
        '3.2px 6.5px 8.2px rgba(0, 0, 0, 0.08)',
        '4.7px 9.4px 11.8px rgba(0, 0, 0, 0.08)',
        '6.8px 13.6px 17.1px rgba(0, 0, 0, 0.08)',
        '9.6px 19.3px 24.3px rgba(0, 0, 0, 0.08)',
        '13.5px 27px 34px rgba(0, 0, 0, 0.08)',
        '18.5px 37.1px 46.6px rgba(0, 0, 0, 0.08)',
        '25px 50px 62.9px rgba(0, 0, 0, 0.08)',
      ],
    }

    return dropShadows[value].map(shadow => `drop-shadow(${shadow})`).join(' ')
  }

  const boxShadows = {
    1: [
      '0.3px 0.5px 0.7px rgba(0, 0, 0, 0.1)',
      '0.4px 0.8px 1px -1.2px rgba(0, 0, 0, 0.1)',
      '1px 2px 2.5px -2.5px rgba(0, 0, 0, 0.1)',
    ],
    2: [
      '0.3px 0.5px 0.7px rgba(0, 0, 0, 0.09)',
      '0.7px 1.3px 1.7px -0.6px rgba(0, 0, 0, 0.09)',
      '1.3px 2.6px 3.3px -1.2px rgba(0, 0, 0, 0.09)',
      '2.6px 5.2px 6.5px -1.9px rgba(0, 0, 0, 0.09)',
      '5px 10px 12.6px -2.5px rgba(0, 0, 0, 0.09)',
    ],
    3: [
      '0.3px 0.5px 0.7px rgba(0, 0, 0, 0.08)',
      '1.2px 2.4px 3px -0.3px rgba(0, 0, 0, 0.08)',
      '2.1px 4.3px 5.4px -0.6px rgba(0, 0, 0, 0.08)',
      '3.2px 6.5px 8.2px -0.8px rgba(0, 0, 0, 0.08)',
      '4.7px 9.4px 11.8px -1.1px rgba(0, 0, 0, 0.08)',
      '6.8px 13.6px 17.1px -1.4px rgba(0, 0, 0, 0.08)',
      '9.6px 19.3px 24.3px -1.7px rgba(0, 0, 0, 0.08)',
      '13.5px 27px 34px -1.9px rgba(0, 0, 0, 0.08)',
      '18.5px 37.1px 46.6px -2.2px rgba(0, 0, 0, 0.08)',
      '25px 50px 62.9px -2.5px rgba(0, 0, 0, 0.08)',
    ],
  }

  return boxShadows[value].join(', ')
}

export const insetBorderAdapter = (
  width: NotFontSize,
  color: Color,
  alpha: Knob | number,
  showsBorder: boolean[] = [true]
) => {
  let boxShadow = ''

  const finalColor = colorWithAlpha(color, alpha)
  const finalWidth = notFontSizeAdapter(width)

  const viewCombinationsA = {
    all: `inset 0 0 0 ${finalWidth} ${finalColor}`,

    top: `inset 0 ${finalWidth} ${finalColor}`,
    right: `inset calc(${finalWidth} * -1) 0 ${finalColor}`,
    bottom: `inset 0 calc(${finalWidth} * -1) ${finalColor}`,
    left: `inset ${finalWidth} 0 ${finalColor}`,

    topRight: `inset calc(${finalWidth} * -1) ${finalWidth} ${finalColor}`,
    rightBottom: `inset calc(${finalWidth} * -1) calc(${finalWidth} * -1) ${finalColor}`,
    bottomLeft: `inset ${finalWidth} calc(${finalWidth} * -1) ${finalColor}`,
    leftTop: `inset ${finalWidth} ${finalWidth} ${finalColor}`,
  }

  const viewCombinationsB = {
    topBottom: viewCombinationsA.top + ', ' + viewCombinationsA.bottom,
    leftRight: viewCombinationsA.left + ', ' + viewCombinationsA.right,

    topRightBottom: viewCombinationsA.topRight + ', ' + viewCombinationsA.bottom,
    rightBottomLeft: viewCombinationsA.rightBottom + ', ' + viewCombinationsA.left,
    bottomLeftTop: viewCombinationsA.bottomLeft + ', ' + viewCombinationsA.top,
    leftTopRight: viewCombinationsA.leftTop + ', ' + viewCombinationsA.right,
  }

  switch (showsBorder.length) {
    case 1:
      if (showsBorder[0]) boxShadow = viewCombinationsA.all
      break
    case 2:
      if (showsBorder[0] && !showsBorder[1]) boxShadow = viewCombinationsB.topBottom
      else if (!showsBorder[0] && showsBorder[1]) boxShadow = viewCombinationsB.leftRight
      else if (showsBorder[0] && showsBorder[1]) boxShadow = viewCombinationsA.all
      break
    case 3:
      if (showsBorder[0] && !showsBorder[1] && !showsBorder[2])
        boxShadow = viewCombinationsA.top
      else if (!showsBorder[0] && showsBorder[1] && !showsBorder[2])
        boxShadow = viewCombinationsA.right
      else if (!showsBorder[0] && !showsBorder[1] && showsBorder[2])
        boxShadow = viewCombinationsA.bottom
      else if (showsBorder[0] && showsBorder[1] && !showsBorder[2])
        boxShadow = viewCombinationsA.topRight
      else if (!showsBorder[0] && showsBorder[1] && showsBorder[2])
        boxShadow = viewCombinationsA.rightBottom
      else if (showsBorder[0] && !showsBorder[1] && showsBorder[2])
        boxShadow = viewCombinationsB.topBottom
      else if (showsBorder[0] && showsBorder[1] && showsBorder[2])
        boxShadow = viewCombinationsB.topRightBottom
      break
    case 4:
      if (showsBorder[0] && !showsBorder[1] && !showsBorder[2] && !showsBorder[3])
        boxShadow = viewCombinationsA.top
      else if (!showsBorder[0] && showsBorder[1] && !showsBorder[2] && !showsBorder[3])
        boxShadow = viewCombinationsA.right
      else if (!showsBorder[0] && !showsBorder[1] && showsBorder[2] && !showsBorder[3])
        boxShadow = viewCombinationsA.bottom
      else if (!showsBorder[0] && !showsBorder[1] && !showsBorder[2] && showsBorder[3])
        boxShadow = viewCombinationsA.left
      else if (showsBorder[0] && showsBorder[1] && !showsBorder[2] && !showsBorder[3])
        boxShadow = viewCombinationsA.topRight
      else if (!showsBorder[0] && showsBorder[1] && showsBorder[2] && !showsBorder[3])
        boxShadow = viewCombinationsA.rightBottom
      else if (!showsBorder[0] && !showsBorder[1] && showsBorder[2] && showsBorder[3])
        boxShadow = viewCombinationsA.bottomLeft
      else if (showsBorder[0] && !showsBorder[1] && !showsBorder[2] && showsBorder[3])
        boxShadow = viewCombinationsA.leftTop
      else if (showsBorder[0] && showsBorder[1] && showsBorder[2] && !showsBorder[3])
        boxShadow = viewCombinationsB.topRightBottom
      else if (!showsBorder[0] && showsBorder[1] && showsBorder[2] && showsBorder[3])
        boxShadow = viewCombinationsB.rightBottomLeft
      else if (showsBorder[0] && !showsBorder[1] && showsBorder[2] && showsBorder[3])
        boxShadow = viewCombinationsB.bottomLeftTop
      else if (showsBorder[0] && showsBorder[1] && !showsBorder[2] && showsBorder[3])
        boxShadow = viewCombinationsB.leftTopRight
      else if (showsBorder[0] && !showsBorder[1] && showsBorder[2] && !showsBorder[3])
        boxShadow = viewCombinationsB.topBottom
      else if (!showsBorder[0] && showsBorder[1] && !showsBorder[2] && showsBorder[3])
        boxShadow = viewCombinationsB.leftRight
      else if (showsBorder[0] && showsBorder[1] && showsBorder[2] && showsBorder[3])
        boxShadow = viewCombinationsA.all
      break
  }

  return boxShadow
}

export const borderRadiusAdapter = (...borderRadius: NotFontSize[]) => {
  const a = borderRadius[0] !== undefined ? notFontSizeAdapter(borderRadius[0]) : ''
  const b = borderRadius[1] !== undefined ? notFontSizeAdapter(borderRadius[1]) : ''
  const c = borderRadius[2] !== undefined ? notFontSizeAdapter(borderRadius[2]) : ''
  const d = borderRadius[3] !== undefined ? notFontSizeAdapter(borderRadius[3]) : ''

  return `${a} ${b} ${c} ${d}`
}

// TODO: test

export const colorWithAlpha = (valueColor: Color, alpha: Knob | number) => {
  let finalColor = colorAdapter(valueColor)
  if (finalColor === '') return ''

  finalColor = getCSSVarValue(finalColor.slice(4, -1))

  if (finalColor.includes('rgb')) {
    finalColor = finalColor.slice(5, finalColor.length - 1)

    return `rgba(${finalColor}, ${alpha})`
  }

  // TODO: hacer los otros sistemas de colores

  if (finalColor.includes('#')) return finalColor + Math.trunc(alpha * 255).toString(16)

  return ''
}

export const porcent = (value: Knob) => {
  if (!knobVars.includes(value)) return ''

  return `${value * 100}%`
}
