import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'

export const useDarkMode = () => useSelector((store: AppStore) => store.darkMode)
