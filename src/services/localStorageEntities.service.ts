import { User } from '@/models'
import { Sections } from '@/models/sections.model'
import { LocalStorageEntity } from '@/tools'

export const userEntity = new LocalStorageEntity<User>('user')
export const tokenEntity = new LocalStorageEntity<string>('token')
export const darkModeEntity = new LocalStorageEntity<boolean>('dark-mode')
export const sectionActiveEntity = new LocalStorageEntity<Sections>('section-active')
export const showRightPanelEntity = new LocalStorageEntity<boolean>('show-right-panel')
