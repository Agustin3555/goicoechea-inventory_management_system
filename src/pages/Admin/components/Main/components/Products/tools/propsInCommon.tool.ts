import { SECTION_KEYS } from '@/models'
import { setNewResourceData } from '@/redux'

export const propsInCommon = {
  action: setNewResourceData,
  sectionKey: SECTION_KEYS.products,
  sectionDependency: [SECTION_KEYS.products],
}
