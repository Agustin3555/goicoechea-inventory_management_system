import { loginAdapter } from '@/adapters'
import { Auth_LoginData } from '@/models'
import { publicInstance } from '@/tools'

const collection = '/auth'

export class AuthService {
  static async login(data: Auth_LoginData) {
    const adaptedInput = loginAdapter.input(data)

    const response = await publicInstance.post(`${collection}/login`, adaptedInput)
    if (!response) return undefined

    const adaptedResponse = loginAdapter.output(response.data)
    return adaptedResponse
  }
}
