import { Sections } from '@/models/sections.model'
import { ResourceRef } from '@/pages/Admin/tools'
import { getDeepCopy } from '@/tools'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Info {
  [key: string]: any
}

export interface ItemData {
  meta: {
    selected: boolean
    text: string
  }
  info?: Info
}

interface Item {
  [key: number]: ItemData
}

export interface SearchedDataState {
  [key: string]: Item
}

const initialState: SearchedDataState = {
  [Sections.SALES.key]: {},
  [Sections.OFFERS.key]: {},
  [Sections.PRODUCTS.key]: {},
  [Sections.MANUFACTURERS.key]: {},
  [Sections.CATEGORIES.key]: {},
  [Sections.USERS.key]: {},
}

export const searchedDataSlice = createSlice({
  name: 'searchedData',
  initialState,
  reducers: {
    setSearchedData: (
      state,
      action: PayloadAction<{
        sectionKey: string
        items: ResourceRef[]
      }>
    ) => {
      const { sectionKey, items } = action.payload
      const stateCopy = getDeepCopy(state)

      stateCopy[sectionKey] = {}

      items.forEach(item => {
        stateCopy[sectionKey][item.id] = {
          meta: {
            text: item.text,
            selected: false,
          },
        }
      })

      return stateCopy
    },
    toggleSelectItem: (
      state,
      action: PayloadAction<{
        sectionKey: string
        id: number
      }>
    ) => {
      const { sectionKey, id } = action.payload
      const stateCopy = getDeepCopy(state)

      stateCopy[sectionKey][id].meta.selected = !stateCopy[sectionKey][id].meta.selected

      return stateCopy
    },
    setSelectAll: (
      state,
      action: PayloadAction<{
        sectionKey: string
        value: boolean
      }>
    ) => {
      const { sectionKey, value } = action.payload
      const stateCopy = getDeepCopy(state)

      const items = stateCopy[sectionKey]

      for (const key in items) items[key].meta.selected = value

      return stateCopy
    },
    loadItemInfo: (
      state,
      action: PayloadAction<{
        sectionKey: string
        id: number
        info: Info
      }>
    ) => {
      const { sectionKey, id, info } = action.payload
      const stateCopy = getDeepCopy(state)

      stateCopy[sectionKey][id].info = info

      return stateCopy
    },
  },
})

export const { setSearchedData, toggleSelectItem, setSelectAll, loadItemInfo } =
  searchedDataSlice.actions

export default searchedDataSlice.reducer
