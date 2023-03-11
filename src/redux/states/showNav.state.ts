import { createSlice } from '@reduxjs/toolkit'

const defaultState = false

export const showNavSlice = createSlice({
  name: 'showNav',
  initialState: defaultState,
  reducers: {
    toggleShowNav: state => !state,
  },
})

export const { toggleShowNav } = showNavSlice.actions

export default showNavSlice.reducer
