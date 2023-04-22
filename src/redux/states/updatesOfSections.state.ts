import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UpdatesOfSectionsState {
  [key: string]: number
}

export const updatesOfSectionsSlice = createSlice({
  name: 'updatesOfSections',
  initialState: {} as UpdatesOfSectionsState,
  reducers: {
    tickSectionUpdate: (state, action: PayloadAction<string>) => {
      const section = action.payload

      const copy = { ...state }

      if (copy[section]) copy[section]++
      else copy[section] = 1

      return copy
    },
  },
})

export const { tickSectionUpdate } = updatesOfSectionsSlice.actions

export default updatesOfSectionsSlice.reducer
