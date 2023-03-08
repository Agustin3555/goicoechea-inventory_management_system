import { LocalStorageEntities } from '@/models'
import { privateInstance } from '@/services/instances'
import { LocalStorageEntity } from '@/tools'

const tokenEntity = new LocalStorageEntity<string>(LocalStorageEntities.TOKEN)

export const PrivateInterceptor = () => {
  privateInstance.interceptors.request.use(config => {
    // Obtener el token de autenticación
    const tokenValue = tokenEntity.get()

    // Si hay un token de autenticación, agregarlo al encabezado de la solicitud
    if (tokenValue) config.headers['Authorization'] = `Bearer ${tokenValue}`

    return config
  })
}
