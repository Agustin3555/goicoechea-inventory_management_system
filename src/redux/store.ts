import { User } from '@/models'
import { configureStore } from '@reduxjs/toolkit'
import {
  activeViewsReducer,
  darkModeReducer,
  sectionActiveReducer,
  showNavReducer,
  showRightPanelReducer,
  userReducer,
} from './states'

export interface AppStore {
  user: User
  darkMode: boolean
  sectionActive: string
  activeViews: { [x: string]: string }
  showNav: boolean
  showRightPanel: boolean
}

export default configureStore<AppStore>({
  reducer: {
    user: userReducer,
    darkMode: darkModeReducer,
    sectionActive: sectionActiveReducer,
    activeViews: activeViewsReducer,
    showNav: showNavReducer,
    showRightPanel: showRightPanelReducer,
  },
})
