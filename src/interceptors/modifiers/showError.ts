import { MessageType, enqueueMessage, store } from '@/redux'
import { getErrorInterpretation } from '@/tools'

export const showError = (error: any) => {
  console.log(error.code)

  const text = getErrorInterpretation(error.code)

  store.dispatch(enqueueMessage({ text, type: MessageType.error }))
}
