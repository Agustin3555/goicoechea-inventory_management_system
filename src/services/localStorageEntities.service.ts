import { User } from '@/models'
import { LocalStorageEntity } from '@/tools'

export const userEntity = new LocalStorageEntity<User>('user')
export const tokenEntity = new LocalStorageEntity<string>('token')
export const darkModeEntity = new LocalStorageEntity<boolean>('dark-mode')
export const sectionActiveEntity = new LocalStorageEntity<string>('section-active')
export const activeViewsEntity = new LocalStorageEntity<{ [x: string]: string }>(
  'active-views'
)
