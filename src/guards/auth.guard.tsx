import { AppStore } from '@/redux/store'
import { PUBLIC_ROUTES } from '@/routes'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthGuard = () => {
  const userState = useSelector((store: AppStore) => store.user)

  return userState.name ? <Outlet /> : <Navigate replace to={PUBLIC_ROUTES.login} />
}

export default AuthGuard
