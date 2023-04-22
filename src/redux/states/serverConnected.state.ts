import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ServerConnectedState = boolean

const initialState: ServerConnectedState = false

// TODO: implementar la logica de que no se pueda hacer peticiones a la API si no se esta conectado al servidor
export const serverConnectedSlice = createSlice({
  name: 'serverConnected',
  initialState,
  reducers: {
    setConnection: (state, action: PayloadAction<ServerConnectedState>) => {
      const newState = action.payload

      return newState
    },
  },
})

export const { setConnection } = serverConnectedSlice.actions

export default serverConnectedSlice.reducer
