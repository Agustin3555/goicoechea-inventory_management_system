import { useDarkMode } from '@/hooks'
import { FieldNameStyled } from './FieldName.styled'

const FieldName = ({ title }: { title: string }) => {
  const darkMode = useDarkMode()

  return (
    <FieldNameStyled.Component p={FieldNameStyled.adapter(darkMode)}>
      {title}
    </FieldNameStyled.Component>
  )
}

export default FieldName
