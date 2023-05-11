import { Sections } from '@/models/sections.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SetErrorInFieldAction {
  sectionKey: string
  fieldKey: string
  error: undefined | boolean
}

export interface ErrorInFieldState {
  [key: string]: { [key: string]: any }
}

const initialState: ErrorInFieldState = {
  [Sections.SALES.key]: {},
  [Sections.OFFERS.key]: {},
  [Sections.PRODUCTS.key]: {},
  [Sections.MANUFACTURERS.key]: {},
  [Sections.CATEGORIES.key]: {},
  [Sections.USERS.key]: {},
}

export const errorInFieldSlice = createSlice({
  name: 'errorInField',
  initialState,
  reducers: {
    setErrorInField: (state, action: PayloadAction<SetErrorInFieldAction>) => {
      const { sectionKey, fieldKey, error } = action.payload
      const stateCloned = JSON.parse(JSON.stringify(state))

      stateCloned[sectionKey][fieldKey] = error

      return stateCloned
    },
  },
})

export const { setErrorInField } = errorInFieldSlice.actions

export default errorInFieldSlice.reducer
