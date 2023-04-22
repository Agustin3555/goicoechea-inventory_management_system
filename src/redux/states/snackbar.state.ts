import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum MessageType {
  info,
  warning,
  error,
}

interface MessageInfo {
  text: string
  type: MessageType
}

interface Message {
  id: string
  info: MessageInfo
  screenTime: number
}

export interface SnackbarState {
  messages: Message[]
}

const defaultState: SnackbarState = {
  messages: [],
}

const readingTimeInMs = (text: string) => {
  // Remover espacios en blanco al inicio y final del string
  text = text.trim()

  if (text === '') return 1000

  const words = text.split(/\s+/).length

  // Valor entre 200 a 400
  const WORDS_PER_MINUTE = 300
  // Valor entre 1 a 10
  const READING_DIFFICULTY = 3.75

  const readingTimeInMinutes = words / WORDS_PER_MINUTE

  return Math.round(readingTimeInMinutes * 60 * 1000 * READING_DIFFICULTY)
}

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: defaultState,
  reducers: {
    enqueueMessage: (state, action: PayloadAction<MessageInfo>) => {
      const messageInfo = action.payload
      const currentTime = new Date()

      const newMessage: Message = {
        id:
          currentTime.getHours().toString() +
          currentTime.getMinutes().toString() +
          currentTime.getSeconds().toString() +
          currentTime.getMilliseconds().toString(),
        info: messageInfo,
        screenTime: readingTimeInMs(messageInfo.text),
      }

      state.messages.push(newMessage)
    },
    dequeueMessage: state => {
      state.messages.shift()
    },
    clearMessageQueue: () => defaultState,
  },
})

export const { enqueueMessage, dequeueMessage, clearMessageQueue } = snackbarSlice.actions

export default snackbarSlice.reducer
