import { SECTION_KEYS, UserModels, VIEW_KEYS } from '@/models'
import { LocalStorageEntity } from '@/tools'

export const userEntity = new LocalStorageEntity<UserModels.FullData>('user')
export const tokenEntity = new LocalStorageEntity<string>('token')
export const darkModeEntity = new LocalStorageEntity<boolean>('dark-mode')
export const sectionActiveEntity = new LocalStorageEntity<SECTION_KEYS>('section-active')
export const activeViewsEntity = new LocalStorageEntity<{ [x: string]: VIEW_KEYS }>(
  'active-views'
)
