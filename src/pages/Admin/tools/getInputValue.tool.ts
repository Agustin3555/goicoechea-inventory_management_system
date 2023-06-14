import { InputValuesState } from '@/redux'

export const getInputValue = (
  storageAddress: string,
  inputValues: InputValuesState
) => {
  const keys = storageAddress.split('/')

  let currentValue: InputValuesState | undefined = inputValues

  for (const key of keys) {
    if (!currentValue || typeof currentValue !== 'object') return undefined

    currentValue = currentValue[key] as InputValuesState | undefined
  }

  return currentValue
}
