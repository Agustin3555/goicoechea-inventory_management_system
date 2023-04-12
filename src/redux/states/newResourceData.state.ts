import { Sections } from '@/models/sections.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NewResourceData {
  [key: string]: { [key: string]: any }
}

const defaultState: NewResourceData = {
  [Sections.SALES.key]: {},
  [Sections.OFFERS.key]: {},
  [Sections.PRODUCTS.key]: {},
  [Sections.MANUFACTURERS.key]: {},
  [Sections.CATEGORIES.key]: {},
  [Sections.USERS.key]: {},
}

export const newResourceDataSlice = createSlice({
  name: 'newResourceData',
  initialState: defaultState,
  reducers: {
    setNewResourceData: (
      state,
      action: PayloadAction<{ sectionKey: string; fieldKey: string; value: any }>
    ) => {
      const { sectionKey, fieldKey, value } = action.payload
      const stateCloned = JSON.parse(JSON.stringify(state))

      stateCloned[sectionKey][fieldKey] = value

      return stateCloned
    },
  },
})

export const { setNewResourceData } = newResourceDataSlice.actions

export default newResourceDataSlice.reducer
