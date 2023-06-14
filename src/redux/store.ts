import { configureStore } from '@reduxjs/toolkit'
import {
  ActiveViewsState,
  activeViewsReducer,
  darkModeReducer,
  SearchedDataState,
  searchedDataReducer,
  sectionActiveReducer,
  serverConnectedReducer,
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
  InputValuesState,
  inputValuesReducer,
  InputErrorsState,
  inputErrorsReducer,
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
  inputValues: InputValuesState
  inputErrors: InputErrorsState
}

export default configureStore<AppStore>({
  reducer: {
    user: userReducer,
    darkMode: darkModeReducer,
    serverConnected: serverConnectedReducer,
    showNav: showNavReducer,
    showRightPanel: showRightPanelReducer,
    sectionActive: sectionActiveReducer,
    activeViews: activeViewsReducer,
    snackbar: snackbarReducer,
    updatesOfSections: updatesOfSectionsReducer,
    searchedData: searchedDataReducer,
    inputValues: inputValuesReducer,
    inputErrors: inputErrorsReducer,
  },
})
