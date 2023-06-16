import { useSelector } from 'react-redux'
import { AppStore } from '@/redux'
import { getInputError } from '../tools'

export const useGetInputError = ({ storageAddress }: { storageAddress: string }) => {
  const error = useSelector((store: AppStore) =>
    getInputError(storageAddress, store.inputErrors)
  )

  return error
}
