import { configureStore } from '@reduxjs/toolkit'
import {
  ActiveViewsState,
  activeViewsReducer,
  darkModeReducer,
  NewResourceDataState,
  newResourceDataReducer,
  SearchedDataState,
  searchedDataReducer,
  sectionActiveReducer,
  ServerConnectedReducer,
  ServerConnectedState,
  showNavReducer,
  showRightPanelReducer,
  SnackbarState,
  snackbarReducer,
  UpdatesOfSectionsState,
  updatesOfSectionsReducer,
  userReducer,
  ShowNavState,
  DarkModeState,
  ShowRightPanelState,
  UserState,
  SectionActiveState,
} from './states'

export interface AppStore {
  user: UserState
  darkMode: DarkModeState
  serverConnected: ServerConnectedState
  showNav: ShowNavState
  showRightPanel: ShowRightPanelState
  sectionActive: SectionActiveState
  activeViews: ActiveViewsState
  snackbar: SnackbarState
  updatesOfSections: UpdatesOfSectionsState
  searchedData: SearchedDataState
  newResourceData: NewResourceDataState
}

export default configureStore<AppStore>({
  reducer: {
    user: userReducer,
    darkMode: darkModeReducer,
    serverConnected: ServerConnectedReducer,
    showNav: showNavReducer,
    showRightPanel: showRightPanelReducer,
    sectionActive: sectionActiveReducer,
    activeViews: activeViewsReducer,
    snackbar: snackbarReducer,
    updatesOfSections: updatesOfSectionsReducer,
    searchedData: searchedDataReducer,
    newResourceData: newResourceDataReducer,
  },
})
