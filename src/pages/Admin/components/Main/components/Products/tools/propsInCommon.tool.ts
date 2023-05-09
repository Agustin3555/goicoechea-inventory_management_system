import { Sections } from '@/models'
import { setNewResourceData } from '@/redux'

export const propsInCommon = {
  action: setNewResourceData,
  sectionKey: Sections.PRODUCTS.key,
  dependentSectionKey: Sections.PRODUCTS.key,
}
