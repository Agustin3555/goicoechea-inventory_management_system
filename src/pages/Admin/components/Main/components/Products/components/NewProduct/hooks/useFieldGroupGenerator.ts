import { getInputValue } from '@/pages/Admin/tools'
import { setInputError, setInputValue, store } from '@/redux'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export const useFieldGroupGenerator = () => {
  const dispatch = useDispatch()
  const [index, setIndex] = useState(0)
  const [items, setItems] = useState<number[]>([])

  const addButtonHandleClick = () => {
    setItems(prevItems => [...prevItems, index])
    setIndex(prevIndex => prevIndex + 1)
  }

  const removeItem = (index: number) => {
    setItems(prevItems => prevItems.filter(item => item !== index))
  }

  const clearField = (storageAddress: string) => {
    if (getInputValue(storageAddress, store.getState().inputValues) !== undefined)
      dispatch(setInputValue({ storageAddress, value: undefined }))

    dispatch(setInputError({ storageAddress, error: undefined }))
  }

  return { items, addButtonHandleClick, clearField, removeItem }
}
