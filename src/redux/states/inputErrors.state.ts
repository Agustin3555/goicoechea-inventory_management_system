import { getDeepCopy } from '@/tools'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type InputError = boolean

export interface InputErrorsState {
  [key: string]: undefined | InputError | InputErrorsState
}

export const inputErrorsSlice = createSlice({
  name: 'inputErrors',
  initialState: {} as InputErrorsState,
  reducers: {
    setInputError: (
      state,
      action: PayloadAction<{
        storageAddress: string
        error?: InputError
      }>
    ) => {
      const { storageAddress, error } = action.payload
      const stateCopy = getDeepCopy(state)

      // Divide la dirección en partes utilizando el separador "/"
      const keys = storageAddress.split('/')
      let currentLevel = stateCopy

      keys.forEach((key, index) => {
        /*
          Verifica si la clave actual existe en el nivel actual de la estructura. Si
          no existe, crea la clave como un objeto vacío
        */
        if (!currentLevel[key]) currentLevel[key] = {}

        if (index === keys.length - 1) {
          /*
            Si estamos en la última clave, establece el valor proporcionado en el
            estado
          */
          currentLevel[key] = error
        } else {
          /*
            Si no, actualiza el nivel actual al siguiente nivel utilizando la clave
            actual
          */
          currentLevel = currentLevel[key] as InputErrorsState
        }
      })

      return stateCopy
    },
  },
})

export const { setInputError } = inputErrorsSlice.actions

export default inputErrorsSlice.reducer
