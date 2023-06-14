import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStore, InputValuesState } from '@/redux'
import { Option, getInputValue } from '../tools'
import { SECTION_KEYS } from '@/models'

const compare = (a: any[], b: any[]) => a.some((value, index) => value !== b[index])

export const useDependency = ({
  setOptions,
  sectionDependency,
  fieldDependency,
}: {
  setOptions: Dispatch<SetStateAction<Option[]>>
  sectionDependency: SECTION_KEYS[]
  fieldDependency: string[]
}) => {
  // TODO: test de updatesOfSections
  const updatesOfSections = useSelector((store: AppStore) => store.updatesOfSections)
  const inputValues = useSelector((store: AppStore) => store.inputValues)

  const [prevSectionUpdates, setPrevSectionUpdates] = useState<number[]>([])

  const [prevFieldUpdates, setPrevFieldUpdates] = useState<
    (InputValuesState | undefined)[]
  >([])

  const sectionUpdates = useMemo(
    () => sectionDependency.map(item => updatesOfSections[item]),
    [updatesOfSections]
  )

  const fieldUpdates = useMemo(
    () => fieldDependency.map(item => getInputValue(item, inputValues)),
    [inputValues]
  )

  useEffect(() => {
    const hasSectionUpdatesChanged = compare(sectionUpdates, prevSectionUpdates)
    const hasFieldUpdatesChanged = compare(fieldUpdates, prevFieldUpdates)

    if (hasSectionUpdatesChanged || hasFieldUpdatesChanged) setOptions([])

    setPrevSectionUpdates(sectionUpdates)
    setPrevFieldUpdates(fieldUpdates)
  }, [sectionUpdates, fieldUpdates])
}
