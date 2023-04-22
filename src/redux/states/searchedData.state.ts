import { Sections } from '@/models/sections.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Item {
  selected: boolean
  data: {
    id: number
  }
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
    setSearchedData: (state, action: PayloadAction<{ sectionId: string; data: any[] }>) => {
      const { sectionId, data } = action.payload

      const items: Item[] = data.map(item => ({ selected: false, data: item }))

      const newState = { ...state, ...{ [sectionId]: items } }

      return newState
    },
    toggleSelectItem: (state, action: PayloadAction<{ sectionId: string; id: number }>) => {
      const { sectionId, id } = action.payload

      const item = state[sectionId].filter(item => item.data.id === id)[0]

      item.selected = !item.selected

      const newState = { ...state }

      return newState
    },
  },
})

export const { setSearchedData, toggleSelectItem } = searchedDataSlice.actions

export default searchedDataSlice.reducer
