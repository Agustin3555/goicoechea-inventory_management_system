import { publicInstance } from '@/tools'
import { catchError } from './modifiers'

export const PublicInterceptor = () => {
  publicInstance.interceptors.response.use(undefined, catchError)
}
