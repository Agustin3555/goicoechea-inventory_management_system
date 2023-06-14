import { getDeepCopy } from '@/tools'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type InputValue = boolean | number | string

export interface InputValuesState {
  [key: string]: undefined | InputValue | InputValuesState
}

export const inputValuesSlice = createSlice({
  name: 'inputValues',
  initialState: {} as InputValuesState,
  reducers: {
    setInputValue: (
      state,
      action: PayloadAction<{
        storageAddress: string
        value?: InputValue
      }>
    ) => {
      const { storageAddress, value } = action.payload
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
          currentLevel[key] = value
        } else {
          /*
            Si no, actualiza el nivel actual al siguiente nivel utilizando la clave
            actual
          */
          currentLevel = currentLevel[key] as InputValuesState
        }
      })

      return stateCopy
    },
  },
})

export const { setInputValue } = inputValuesSlice.actions

export default inputValuesSlice.reducer
