import { Option } from './selector.tool'

export const reorderBySearch = (inputValue: string, options: Option[]) =>
  options.sort((a, b) => {
    const aTitle = a.title.toLowerCase()
    const bTitle = b.title.toLowerCase()

    const aIndex = aTitle.indexOf(inputValue.toLowerCase())
    const bIndex = bTitle.indexOf(inputValue.toLowerCase())

    if (aIndex === -1 && bIndex === -1) return aTitle.localeCompare(bTitle)
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })
