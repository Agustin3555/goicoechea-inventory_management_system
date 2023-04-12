import { useDarkMode } from '@/hooks'
import { fieldNameStyleAdapter, StylizedFieldName } from './FieldName.styled'

const FieldName = ({ title }: { title: string }) => {
  const darkMode = useDarkMode()

  return <StylizedFieldName p={fieldNameStyleAdapter(darkMode)}>{title}</StylizedFieldName>
}

export default FieldName
