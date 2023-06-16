import { InputErrorsState } from '@/redux'

export const getInputError = (
  storageAddress: string,
  inputValues: InputErrorsState
) => {
  const keys = storageAddress.split('/')

  let currentValue: InputErrorsState | undefined = inputValues

  for (const key of keys) {
    if (!currentValue || typeof currentValue !== 'object') return undefined

    currentValue = currentValue[key] as InputErrorsState | undefined
  }

  return currentValue
}
