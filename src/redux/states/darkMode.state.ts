import { LocalStorageEntities } from '@/models'
import { LocalStorageEntity } from '@/tools'
import { createSlice } from '@reduxjs/toolkit'

const defaultState = false
const darkModeEntity = new LocalStorageEntity<boolean>(LocalStorageEntities.DARK_MODE)

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: (() => {
    // Si existe la entidad en local storage, se la utiliza
    const darkModeValue = darkModeEntity.get()
    if (darkModeValue !== null) return darkModeValue

    // Si existe la media del usuario, se la utiliza
    if (window.matchMedia) return window.matchMedia('(prefers-color-scheme: dark)').matches

    // Si no, se crea la entidad en local storage y se la utiliza
    darkModeEntity.set(defaultState)
    return defaultState
  })(),
  reducers: {
    toggleDarkMode: state => {
      const newState = !state

      darkModeEntity.set(newState)
      return newState
    },
  },
})

export const { toggleDarkMode } = darkModeSlice.actions

export default darkModeSlice.reducer
