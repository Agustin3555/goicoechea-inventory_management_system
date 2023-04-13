import { privateInstance } from '@/tools'
import { addToken, catchError } from './modifiers'

export const PrivateInterceptor = () => {
  privateInstance.interceptors.response.use(undefined, catchError)
  privateInstance.interceptors.request.use(addToken)
}
