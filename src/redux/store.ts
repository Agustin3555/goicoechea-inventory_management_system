import { Sections, User } from '@/models'
import { configureStore } from '@reduxjs/toolkit'
import {
  darkModeReducer,
  sectionActiveReducer,
  showNavReducer,
  showRightPanelReducer,
  userReducer,
} from './states'

export interface AppStore {
  user: User
  darkMode: boolean
  sectionActive: Sections
  showNav: boolean
  showRightPanel: boolean
}

export default configureStore<AppStore>({
  reducer: {
    user: userReducer,
    darkMode: darkModeReducer,
    sectionActive: sectionActiveReducer,
    showNav: showNavReducer,
    showRightPanel: showRightPanelReducer,
  },
})
