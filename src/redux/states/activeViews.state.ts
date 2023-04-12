import { Sections } from '@/models/sections.model'
import { activeViewsEntity } from '@/services'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ActiveViews {
  [key: string]: string
}

const defaultState: ActiveViews = {
  [Sections.SALES.key]: Sections.SALES.views.SEARCH.id,
  [Sections.OFFERS.key]: Sections.OFFERS.views.SEARCH.id,
  [Sections.PRODUCTS.key]: Sections.PRODUCTS.views.SEARCH.id,
  [Sections.MANUFACTURERS.key]: Sections.MANUFACTURERS.views.SEARCH.id,
  [Sections.CATEGORIES.key]: Sections.CATEGORIES.views.SEARCH.id,
  [Sections.USERS.key]: Sections.USERS.views.SEARCH.id,
  [Sections.ME.key]: Sections.ME.views.SEARCH.id,
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
    setActiveViews: (state, action: PayloadAction<{ [x: string]: string }>) => {
      const newState = { ...state, ...action.payload }

      activeViewsEntity.set(newState)
      return newState
    },
  },
})

export const { setActiveViews } = activeViewsSlice.actions

export default activeViewsSlice.reducer
