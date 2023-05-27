import { SECTION_KEYS } from '@/models/sections.model'
import { sectionActiveEntity } from '@/services'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type SectionActiveState = SECTION_KEYS

const defaultState: SectionActiveState = SECTION_KEYS.sales

export const sectionActiveSlice = createSlice({
  name: 'sectionActive',
  initialState: (() => {
    // Si existe la entidad en local storage, se la utiliza
    const value = sectionActiveEntity.get()
    if (value !== null) return value

    // Si no, se crea la entidad en local storage y se la utiliza
    sectionActiveEntity.set(defaultState)
    return defaultState
  })(),
  reducers: {
    setSectionActive: (state, action: PayloadAction<SectionActiveState>) => {
      const { payload: newSection } = action

      sectionActiveEntity.set(newSection)
      return newSection
    },
  },
})

export const { setSectionActive } = sectionActiveSlice.actions

export default sectionActiveSlice.reducer
