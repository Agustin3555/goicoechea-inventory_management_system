import { ErrorListStyled } from './ErrorList.styled'

const ErrorList = ({ errors }: { errors: string[] }) => {
  return (
    <ErrorListStyled.Component>
      {errors.map((error, index) => (
        <p className="item" key={index}>
          {error}
        </p>
      ))}
    </ErrorListStyled.Component>
  )
}

export default ErrorList
