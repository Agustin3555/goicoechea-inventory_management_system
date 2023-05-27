import { SECTION_KEYS, VIEW_KEYS } from '@/models/sections.model'
import { activeViewsEntity } from '@/services'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ActiveViewsState {
  [key: string]: VIEW_KEYS
}

const defaultState: ActiveViewsState = {
  [SECTION_KEYS.sales]: VIEW_KEYS.search,
  [SECTION_KEYS.offers]: VIEW_KEYS.search,
  [SECTION_KEYS.products]: VIEW_KEYS.search,
  [SECTION_KEYS.manufacturers]: VIEW_KEYS.search,
  [SECTION_KEYS.categories]: VIEW_KEYS.search,
  [SECTION_KEYS.users]: VIEW_KEYS.search,
  [SECTION_KEYS.me]: VIEW_KEYS.profile,
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
      action: PayloadAction<{ sectionKey: SECTION_KEYS; viewKey: VIEW_KEYS }>
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
