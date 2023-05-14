import { colorWithAlpha, fontSizeAdapter, notFontSizeAdapter } from '@/styles'

export const GLASS_BACKGROUND_COLOR = (darkMode: boolean) =>
  colorWithAlpha(darkMode ? 'g-17' : 'g-0', darkMode ? 0.8 : 0.7)

export const GLASS_BLUR = 'blur(.4688rem)'

// export const GAP = fontSizeAdapter('xs')
// export const GAP = notFontSizeAdapter('2xs')
export const GAP = 'var(--size-font-2xs)'
