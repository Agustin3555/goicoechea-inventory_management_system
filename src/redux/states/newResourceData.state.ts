import { getDeepCopy, ResourceAction, Value } from '@/tools'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NewResourceDataState {
  [key: string]: { [key: string]: Value }
}

export const newResourceDataSlice = createSlice({
  name: 'newResourceData',
  initialState: {} as NewResourceDataState,
  reducers: {
    setNewResourceData: (state, action: PayloadAction<ResourceAction>) => {
      const { sectionKey, fieldKey, value } = action.payload
      const stateCopy = getDeepCopy(state)

      // Inicializar como objeto vacío si no existe
      if (!stateCopy[sectionKey]) stateCopy[sectionKey] = {}

      stateCopy[sectionKey][fieldKey] = value

      return stateCopy
    },
  },
})

export const { setNewResourceData } = newResourceDataSlice.actions

export default newResourceDataSlice.reducer
