import { createSlice } from '@reduxjs/toolkit'

export type ShowRightPanelState = boolean

const initialState: ShowRightPanelState = false

export const showRightPanelSlice = createSlice({
  name: 'showRightPanel',
  initialState,
  reducers: {
    toggleShowRightPanel: state => !state,
  },
})

export const { toggleShowRightPanel } = showRightPanelSlice.actions

export default showRightPanelSlice.reducer
