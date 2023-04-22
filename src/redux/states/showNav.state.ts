import { createSlice } from '@reduxjs/toolkit'

export type ShowNavState = boolean

const initialState: ShowNavState = false

export const showNavSlice = createSlice({
  name: 'showNav',
  initialState,
  reducers: {
    toggleShowNav: state => !state,
  },
})

export const { toggleShowNav } = showNavSlice.actions

export default showNavSlice.reducer
