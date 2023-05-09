import { Sections } from '@/models'
import { setNewResourceData, store } from '@/redux'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export const useFieldGroupGenerator = () => {
  const dispatch = useDispatch()
  const [index, setIndex] = useState(0)
  const [items, setItems] = useState<number[]>([])

  const addButtonHandleClick = () => {
    setItems([...items, index])
    setIndex(index + 1)
  }

  const removeItem = (index: number) => {
    const itemsCopy = [...items]

    itemsCopy.splice(
      itemsCopy.findIndex(item => item === index),
      1
    )

    setItems(itemsCopy)
  }

  const clearField = (fieldKey: string) => {
    if (store.getState().newResourceData[Sections.PRODUCTS.key][fieldKey] !== undefined)
      dispatch(
        setNewResourceData({ sectionKey: Sections.PRODUCTS.key, fieldKey, value: undefined })
      )
  }

  return { items, addButtonHandleClick, clearField, removeItem }
}
