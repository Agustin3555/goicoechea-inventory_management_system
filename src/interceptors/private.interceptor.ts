import { privateInstance } from '@/tools'
import { addToken, showError } from './modifiers'

export const PrivateInterceptor = () => {
  privateInstance.interceptors.response.use(undefined, showError)
  privateInstance.interceptors.request.use(addToken)
}
