import {
  CATEGORY_VIEW_KEYS,
  MANUFACTURER_VIEW_KEYS,
  ME_VIEW_KEYS,
  OFFER_VIEW_KEYS,
  PRODUCT_VIEW_KEYS,
  SALE_VIEW_KEYS,
  SECTION_KEYS,
  USER_VIEW_KEYS,
} from '@/models/sections.model'
import { activeViewsEntity } from '@/services'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ActiveViewsState {
  [key: string]: string
}

const defaultState: ActiveViewsState = {
  [SECTION_KEYS.sales]: SALE_VIEW_KEYS.view,
  [SECTION_KEYS.offers]: OFFER_VIEW_KEYS.view,
  [SECTION_KEYS.products]: PRODUCT_VIEW_KEYS.search,
  [SECTION_KEYS.manufacturers]: MANUFACTURER_VIEW_KEYS.view,
  [SECTION_KEYS.categories]: CATEGORY_VIEW_KEYS.view,
  [SECTION_KEYS.users]: USER_VIEW_KEYS.view,
  [SECTION_KEYS.me]: ME_VIEW_KEYS.profile,
}

export const activeViewsSlice = createSlice({
  name: 'activeViews',
  initialState: (() => {
    // Si existe la entidad en local storage, se la utiliza
    const value = activeViewsEntity.get()
    if (value !== null) return value

    // Si no, se crea la entidad en local storage y se la utiliza
    activeViewsEntity.set(defaultState)
    return defaultState
  })(),
  reducers: {
    setActiveViews: (
      state,
      action: PayloadAction<{ sectionKey: SECTION_KEYS; viewKey: string }>
    ) => {
      const { sectionKey, viewKey } = action.payload
      const newState = { ...state, ...{ [sectionKey]: viewKey } }

      activeViewsEntity.set(newState)
      return newState
    },
  },
})

export const { setActiveViews } = activeViewsSlice.actions

export default activeViewsSlice.reducer
