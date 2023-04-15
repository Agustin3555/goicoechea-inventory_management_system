import { AuthAdapters } from '@/adapters'
import { AuthModels } from '@/models'
import { AppError, publicInstance } from '@/tools'

const collection = '/auth'

export namespace AuthServices {
  export const login = async (data: AuthModels.LoginData) => {
    const adaptedInput = AuthAdapters.login.input(data)

    const response = await publicInstance.post(`${collection}/login`, adaptedInput)
    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = AuthAdapters.login.output(response.data)
    return adaptedResponse
  }
}
