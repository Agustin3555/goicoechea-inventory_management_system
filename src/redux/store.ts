import { User_FullData } from '@/models'
import { configureStore } from '@reduxjs/toolkit'
import {
  ActiveViews,
  activeViewsReducer,
  darkModeReducer,
  NewResourceData,
  newResourceDataReducer,
  SearchedData,
  searchedDataReducer,
  sectionActiveReducer,
  showNavReducer,
  showRightPanelReducer,
  Snackbar,
  snackbarReducer,
  userReducer,
} from './states'

export interface AppStore {
  user: User_FullData
  darkMode: boolean
  sectionActive: string
  activeViews: ActiveViews
  showNav: boolean
  showRightPanel: boolean
  searchedData: SearchedData
  newResourceData: NewResourceData
  snackbar: Snackbar
}

export default configureStore<AppStore>({
  reducer: {
    user: userReducer,
    darkMode: darkModeReducer,
    sectionActive: sectionActiveReducer,
    activeViews: activeViewsReducer,
    showNav: showNavReducer,
    showRightPanel: showRightPanelReducer,
    searchedData: searchedDataReducer,
    newResourceData: newResourceDataReducer,
    snackbar: snackbarReducer,
  },
})
