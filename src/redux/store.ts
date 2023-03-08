import { User } from '@/models'
import { configureStore } from '@reduxjs/toolkit'
import { darkModeReducer, userReducer } from './states'

export interface AppStore {
  user: User
  darkMode: boolean
}

export default configureStore<AppStore>({
  reducer: {
    user: userReducer,
    darkMode: darkModeReducer,
  },
})
