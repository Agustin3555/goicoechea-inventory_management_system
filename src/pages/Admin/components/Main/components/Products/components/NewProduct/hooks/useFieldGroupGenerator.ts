import { SECTION_KEYS } from '@/models'
import { setErrorInField, setNewResourceData, store } from '@/redux'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const sectionKey = SECTION_KEYS.products

export const useFieldGroupGenerator = () => {
  const dispatch = useDispatch()
  const [index, setIndex] = useState(0)
  const [items, setItems] = useState<number[]>([])

  const addButtonHandleClick = () => {
    setItems(prevItems => [...prevItems, index])
    setIndex(prevIndex => prevIndex + 1)
  }

  // TODO: test
  const removeItem = (index: number) => {
    setItems(prevItems => prevItems.filter(item => item !== index))
  }

  const clearField = (fieldKey: string) => {
    if (store.getState().newResourceData[sectionKey]?.[fieldKey] !== undefined)
      dispatch(setNewResourceData({ sectionKey, fieldKey, value: undefined }))

    dispatch(setErrorInField({ sectionKey, fieldKey, error: undefined }))
  }

  return { items, addButtonHandleClick, clearField, removeItem }
}
