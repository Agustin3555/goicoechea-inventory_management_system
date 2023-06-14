import { useSelector } from 'react-redux'
import { AppStore } from '@/redux'
import { getInputValue } from '../tools'

export const useGetInputValue = ({ storageAddress }: { storageAddress: string }) => {
  const value = useSelector((store: AppStore) =>
    getInputValue(storageAddress, store.inputValues)
  )

  return value
}
