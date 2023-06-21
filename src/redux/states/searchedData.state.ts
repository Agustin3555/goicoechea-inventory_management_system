import { SECTION_KEYS } from '@/models'
import { ResourceRef } from '@/pages/Admin/tools'
import { getDeepCopy } from '@/tools'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ItemInfo {
  [key: string]: any
}

export interface ItemData {
  meta: {
    selected: boolean
    text: string
  }
  info?: ItemInfo
}

interface Item {
  [key: number]: ItemData
}

export interface SearchedDataState {
  [key: string]: Item
}

export const searchedDataSlice = createSlice({
  name: 'searchedData',
  initialState: {} as SearchedDataState,
  reducers: {
    setSearchedData: (
      state,
      action: PayloadAction<{
        sectionKey: SECTION_KEYS
        items: ResourceRef[]
      }>
    ) => {
      const { sectionKey, items } = action.payload
      const stateCopy = { ...state }

      stateCopy[sectionKey] = {}

      stateCopy[sectionKey] = items.reduce((result, item) => {
        result[item.id] = {
          meta: {
            text: item.text,
            selected: false,
          },
        }
        return result
      }, {})

      return stateCopy
    },
    toggleSelectItem: (
      state,
      action: PayloadAction<{
        sectionKey: SECTION_KEYS
        id: number
      }>
    ) => {
      const { sectionKey, id } = action.payload
      const stateCopy = getDeepCopy(state)

      stateCopy[sectionKey][id].meta.selected =
        !stateCopy[sectionKey][id].meta.selected

      return stateCopy
    },
    setSelectAll: (
      state,
      action: PayloadAction<{
        sectionKey: SECTION_KEYS
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
        sectionKey: SECTION_KEYS
        id: number
        info: ItemInfo
      }>
    ) => {
      const { sectionKey, id, info } = action.payload
      const stateCopy = getDeepCopy(state)

      stateCopy[sectionKey][id].info = { ...stateCopy[sectionKey][id].info, ...info }

      return stateCopy
    },
    setTextItem: (
      state,
      action: PayloadAction<{
        sectionKey: SECTION_KEYS
        id: number
        text: string
      }>
    ) => {
      const { sectionKey, id, text } = action.payload
      const stateCopy = getDeepCopy(state)

      stateCopy[sectionKey][id].meta.text = text

      return stateCopy
    },
  },
})

export const {
  setSearchedData,
  toggleSelectItem,
  setSelectAll,
  loadItemInfo,
  setTextItem,
} = searchedDataSlice.actions

export default searchedDataSlice.reducer
