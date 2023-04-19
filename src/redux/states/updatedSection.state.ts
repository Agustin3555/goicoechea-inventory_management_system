import { SECTIONS } from '@/tools'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UpdatedSection = SECTIONS | null

export const updatedSectionSlice = createSlice({
  name: 'updatedSection',
  initialState: null as UpdatedSection,
  reducers: {
    setUpdatedSection: (state, action: PayloadAction<SECTIONS>) => {
      const section = action.payload

      return section
    },
  },
})

export const { setUpdatedSection } = updatedSectionSlice.actions

export default updatedSectionSlice.reducer
