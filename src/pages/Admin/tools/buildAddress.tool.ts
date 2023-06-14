import { SECTION_KEYS } from '@/models'

export type Keys = (number | string | undefined)[]

export const buildAddress = (sectionKey: SECTION_KEYS, ...extraKeys: Keys) => {
  const keys = [sectionKey, ...extraKeys]

  return keys.join('/')
}
