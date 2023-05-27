import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { Option } from '../tools'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux'
import { SECTION_KEYS } from '@/models'

export enum DEPENDENCY_TYPE {
  new = 'newResourceData',
  edit = 'editResourceData',
}

export type FieldDependency = {
  type: DEPENDENCY_TYPE
  fieldKey: string
}[]

export const useDependency = ({
  setOptions,
  sectionKey,
  sectionDependency,
  fieldDependency,
}: {
  setOptions: Dispatch<SetStateAction<Option[]>>
  sectionKey: SECTION_KEYS
  sectionDependency: SECTION_KEYS[]
  fieldDependency: FieldDependency
}) => {
  const updatesOfSections = useSelector((store: AppStore) => store.updatesOfSections)
  const newResourceData = useSelector((store: AppStore) => store.newResourceData)

  const sectionUpdates = useMemo(
    () => sectionDependency.map(sectionKey => updatesOfSections[sectionKey] || 0),
    [updatesOfSections]
  )

  const fieldUpdates = useMemo(
    () => fieldDependency.map(item => newResourceData[item.fieldKey] || 0),
    [newResourceData]
  )

  useEffect(() => {
    setOptions([])
  }, [sectionUpdates, fieldUpdates])
}
