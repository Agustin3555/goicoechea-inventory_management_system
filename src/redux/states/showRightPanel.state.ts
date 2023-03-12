import { createSlice } from '@reduxjs/toolkit'

const defaultState = false

export const showRightPanelSlice = createSlice({
  name: 'showRightPanel',
  initialState: defaultState,
  reducers: {
    toggleShowRightPanel: state => !state,
  },
})

export const { toggleShowRightPanel } = showRightPanelSlice.actions

export default showRightPanelSlice.reducer
