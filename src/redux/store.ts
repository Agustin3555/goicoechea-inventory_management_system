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
  UpdatedSection,
  updatedSectionReducer,
  userReducer,
} from './states'
import { UserModels } from '@/models'

export interface AppStore {
  user: UserModels.FullData
  darkMode: boolean
  sectionActive: string
  activeViews: ActiveViews
  showNav: boolean
  showRightPanel: boolean
  searchedData: SearchedData
  newResourceData: NewResourceData
  snackbar: Snackbar
  updatedSection: UpdatedSection
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
    updatedSection: updatedSectionReducer,
  },
})
