import { Dispatch, SetStateAction, useEffect } from 'react'
import { Option } from '../tools'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'

export const useSectionDependency = (
  setOptions: Dispatch<SetStateAction<Option[]>>,
  dependentSectionKey: string
) => {
  const dataUpdates = useSelector(
    (store: AppStore) => store.updatesOfSections[dependentSectionKey]
  )

  useEffect(() => {
    setOptions([])
  }, [dataUpdates])
}
