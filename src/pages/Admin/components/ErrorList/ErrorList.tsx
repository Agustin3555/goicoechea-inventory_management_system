import { StylizedErrorList } from './ErrorList.styled'

const ErrorList = ({ errors }: { errors: string[] }) => {
  return (
    <StylizedErrorList>
      {errors.map((error, index) => (
        <p className="item" key={index}>
          {error}
        </p>
      ))}
    </StylizedErrorList>
  )
}

export default ErrorList
