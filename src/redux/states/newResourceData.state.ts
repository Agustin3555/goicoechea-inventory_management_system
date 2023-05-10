import { Sections } from '@/models/sections.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Value = undefined | boolean | number | string

export interface NewResourceAction {
  sectionKey: string
  fieldKey: string
  value: Value
}

export interface NewResourceDataState {
  [key: string]: { [key: string]: any }
}

const initialState: NewResourceDataState = {
  [Sections.SALES.key]: {},
  [Sections.OFFERS.key]: {},
  [Sections.PRODUCTS.key]: {},
  [Sections.MANUFACTURERS.key]: {},
  [Sections.CATEGORIES.key]: {},
  [Sections.USERS.key]: {},
}

export const newResourceDataSlice = createSlice({
  name: 'newResourceData',
  initialState,
  reducers: {
    setNewResourceData: (state, action: PayloadAction<NewResourceAction>) => {
      const { sectionKey, fieldKey, value } = action.payload
      const stateCloned = JSON.parse(JSON.stringify(state))

      stateCloned[sectionKey][fieldKey] = value

      return stateCloned
    },
  },
})

export const { setNewResourceData } = newResourceDataSlice.actions

export default newResourceDataSlice.reducer
