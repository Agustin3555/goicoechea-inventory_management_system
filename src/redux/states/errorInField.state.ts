import { SECTION_KEYS } from '@/models/sections.model'
import { getDeepCopy } from '@/tools'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Error = undefined | boolean

export interface SetErrorInFieldAction {
  sectionKey: SECTION_KEYS
  fieldKey: string
  error: Error
}

export interface ErrorInFieldState {
  [key: string]: { [key: string]: Error }
}

export const errorInFieldSlice = createSlice({
  name: 'errorInField',
  initialState: {} as ErrorInFieldState,
  reducers: {
    setErrorInField: (state, action: PayloadAction<SetErrorInFieldAction>) => {
      const { sectionKey, fieldKey, error } = action.payload
      const stateCopy = getDeepCopy(state)

      // Inicializar como objeto vacío si no existe
      if (!stateCopy[sectionKey]) stateCopy[sectionKey] = {}

      stateCopy[sectionKey][fieldKey] = error

      return stateCopy
    },
  },
})

export const { setErrorInField } = errorInFieldSlice.actions

export default errorInFieldSlice.reducer
