import { COLOR, FONT_SIZE, NOT_FONT_SIZE, colorAlphaAdapter } from '@/styles'

export const MAIN_GAP = FONT_SIZE['2xs']

export const MAIN_BORDER_RADIUS = NOT_FONT_SIZE['4xs']

export const DARK_1 = COLOR.g_4
export const BRIGHT_1 = COLOR.g_12

export const DARK_2 = COLOR.g_14
export const BRIGHT_2 = COLOR.g_0

export const BLUR = 'blur(.4688rem)'

export const glassBackgroundColorAdapter = (darkMode: boolean) =>
  colorAlphaAdapter(darkMode ? COLOR.g_17 : COLOR.g_0, darkMode ? 0.8 : 0.7)
