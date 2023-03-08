import { NotFound } from '@/pages'
import { Route, Routes } from 'react-router-dom'

const RoutesWithNotFound = ({ children }: { children: JSX.Element[] | JSX.Element }) => (
  <Routes>
    {children}
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default RoutesWithNotFound
