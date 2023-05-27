import { SECTION_KEYS } from '@/models'
import { getDeepCopy } from '@/tools'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UpdatesOfSectionsState {
  [key: string]: number
}

export const updatesOfSectionsSlice = createSlice({
  name: 'updatesOfSections',
  initialState: {} as UpdatesOfSectionsState,
  reducers: {
    tickSectionUpdate: (state, action: PayloadAction<SECTION_KEYS>) => {
      const sectionKey = action.payload
      const stateCopy = getDeepCopy(state)

      if (stateCopy[sectionKey]) stateCopy[sectionKey]++
      else stateCopy[sectionKey] = 1

      return stateCopy
    },
  },
})

export const { tickSectionUpdate } = updatesOfSectionsSlice.actions

export default updatesOfSectionsSlice.reducer
