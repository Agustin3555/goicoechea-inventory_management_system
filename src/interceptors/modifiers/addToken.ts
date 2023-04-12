import { tokenEntity } from '@/services'
import { InternalAxiosRequestConfig } from 'axios'

export const addToken = (config: InternalAxiosRequestConfig<any>) => {
  // Obtener el token de autenticación
  const tokenValue = tokenEntity.get()

  // Si hay un token de autenticación, agregarlo al encabezado de la solicitud
  if (tokenValue) config.headers['Authorization'] = `Bearer ${tokenValue}`

  return config
}
