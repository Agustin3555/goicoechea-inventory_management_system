import { Sections } from '@/models/sections.model'
import { sectionActiveEntity } from '@/services'
import { createSlice } from '@reduxjs/toolkit'

const defaultState = Sections.SALES

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
    setSectionActive: (state, action) => {
      const { payload } = action

      sectionActiveEntity.set(payload)
      return payload
    },
  },
})

export const { setSectionActive } = sectionActiveSlice.actions

export default sectionActiveSlice.reducer
