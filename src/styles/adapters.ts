import { getCSSVarValue } from '@/tools/getCSSVarValue'
import { Color, Elevation, Knob } from './types'

export const colorVars = [
  'a-d2',
  'a-d1',
  'a',
  'a-b1',
  'a-b2',

  'b-d2',
  'b-d1',
  'b',
  'b-b1',
  'b-b2',

  'c-d2',
  'c-d1',
  'c',
  'c-b1',
  'c-b2',

  'd-d2',
  'd-d1',
  'd',
  'd-b1',
  'd-b2',

  'g-19',
  'g-18',
  'g-17',
  'g-16',
  'g-15',
  'g-14',
  'g-13',
  'g-12',
  'g-11',
  'g-10',
  'g-9',
  'g-8',
  'g-7',
  'g-6',
  'g-5',
  'g-4',
  'g-3',
  'g-2',
  'g-1',
  'g-0',
]

export const colorAdapter = (value: Color, displacement?: number) => {
  let colorVar = value.substring(12, value.length - 1)

  if (displacement && displacement !== 0) {
    let index

    if (displacement < 0) {
      const minGroupIndex = colorVars.indexOf(
        colorVars
          .filter(element => element.startsWith(colorVar.substring(0, 1)))
          .at(0) as string
      )

      index = colorVars.indexOf(colorVar) + displacement

      if (index < minGroupIndex) index = minGroupIndex
    } else {
      const maxGroupIndex = colorVars.indexOf(
        colorVars
          .filter(element => element.startsWith(colorVar.substring(0, 1)))
          .at(-1) as string
      )

      index = colorVars.indexOf(colorVar) + displacement

      if (maxGroupIndex < index) index = maxGroupIndex
    }

    colorVar = colorVars[index] as Color
  }

  return `var(--color-${colorVar})`
}

export const colorAlphaAdapter = (
  valueColor: Color,
  alpha: Knob | number,
  displacement?: number
) => {
  let finalColor = colorAdapter(valueColor, displacement)
  if (finalColor === '') return ''

  finalColor = getCSSVarValue(finalColor.slice(4, -1))

  if (finalColor.includes('rgb')) {
    finalColor = finalColor.slice(5, finalColor.length - 1)

    return `rgba(${finalColor}, ${alpha})`
  }

  if (finalColor.includes('#')) {
    let hexAlpha = Math.trunc(alpha * 255).toString(16)

    if (hexAlpha.length < 2) hexAlpha = `0${hexAlpha}`

    return `${finalColor}${hexAlpha}`
  }

  return ''
}

export const shadowAdapter = (value: Elevation, asFilter: boolean = false) => {
  if (value === 0) return ''

  if (asFilter) {
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
