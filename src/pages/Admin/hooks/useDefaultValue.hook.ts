import { InputValue, setInputValue } from '@/redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useDefaultValue = ({
  storageAddress,
  value,
  defaultValue,
}: {
  storageAddress: string
  value: any
  defaultValue: InputValue | undefined
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (value === undefined && defaultValue !== undefined) {
    }
    dispatch(setInputValue({ storageAddress, value: defaultValue }))
  }, [])
}
