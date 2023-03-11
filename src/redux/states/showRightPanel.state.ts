import { showRightPanelEntity } from '@/services'
import { createSlice } from '@reduxjs/toolkit'

const defaultState = true

export const showRightPanelSlice = createSlice({
  name: 'showRightPanel',
  initialState: (() => {
    // Si existe la entidad en local storage, se la utiliza
    const value = showRightPanelEntity.get()
    if (value !== null) return value

    // Si no, se crea la entidad en local storage y se la utiliza
    showRightPanelEntity.set(defaultState)
    return defaultState
  })(),
  reducers: {
    toggleShowRightPanel: state => {
      const newState = !state

      showRightPanelEntity.set(newState)
      return newState
    },
  },
})

export const { toggleShowRightPanel } = showRightPanelSlice.actions

export default showRightPanelSlice.reducer
