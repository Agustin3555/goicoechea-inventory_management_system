import { MutableRefObject } from 'react'

const DimensionObserver = ({
  ref,
  children,
}: {
  ref: MutableRefObject<null>
  children: JSX.Element | JSX.Element[]
}) => {
  return (
    <div ref={ref} className="container">
      {children}
    </div>
  )
}

export default DimensionObserver
