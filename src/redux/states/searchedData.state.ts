import { Sections } from '@/models/sections.model'
import { ResourceRef } from '@/pages/Admin/tools'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Item {
  selected: boolean
  data: ResourceRef
}

export interface SearchedDataState {
  [key: string]: Item[]
}

const initialState: SearchedDataState = {
  [Sections.SALES.key]: [],
  [Sections.OFFERS.key]: [],
  [Sections.PRODUCTS.key]: [],
  [Sections.MANUFACTURERS.key]: [],
  [Sections.CATEGORIES.key]: [],
  [Sections.USERS.key]: [],
}

export const searchedDataSlice = createSlice({
  name: 'searchedData',
  initialState,
  reducers: {
    setSearchedData: (
      state,
      action: PayloadAction<{ sectionKey: string; data: ResourceRef[] }>
    ) => {
      const { sectionKey, data } = action.payload

      const items: Item[] = data.map(item => ({ selected: false, data: item }))

      const newState = { ...state, ...{ [sectionKey]: items } }

      return newState
    },
    toggleSelectItem: (state, action: PayloadAction<{ sectionKey: string; id: number }>) => {
      const { sectionKey, id } = action.payload

      const item = state[sectionKey].filter(item => item.data.id === id)[0]

      item.selected = !item.selected

      const newState = { ...state }

      return newState
    },
  },
})

export const { setSearchedData, toggleSelectItem } = searchedDataSlice.actions

export default searchedDataSlice.reducer
