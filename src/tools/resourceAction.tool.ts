import { SECTION_KEYS } from '@/models'

export type Value = undefined | boolean | number | string

export interface ResourceAction {
  sectionKey: SECTION_KEYS
  fieldKey: string
  value: Value
}
