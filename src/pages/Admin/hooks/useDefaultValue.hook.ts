import { InputValue, setInputValue } from '@/redux'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useDefaultValue = ({
  storageAddress,
  value,
  setValue,
  defaultValue,
}: {
  storageAddress: string
  value: any
  setValue?: Dispatch<SetStateAction<string | number | undefined>>
  defaultValue: InputValue | undefined
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (value === undefined && defaultValue !== undefined) {
      setValue && setValue(String(defaultValue))
      dispatch(setInputValue({ storageAddress, value: defaultValue }))
    }
  }, [])
}
