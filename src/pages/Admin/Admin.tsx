import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import { StylizedAdmin } from './Admin.styled'

const Admin = () => {
  const userState = useSelector((store: AppStore) => store.user)

  return <StylizedAdmin>{JSON.stringify(userState)}</StylizedAdmin>
}

export default Admin
