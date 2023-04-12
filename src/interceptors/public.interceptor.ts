import { publicInstance } from '@/tools'
import { showError } from './modifiers'

export const PublicInterceptor = () => {
  publicInstance.interceptors.response.use(undefined, showError)
}
