import { publicInstance } from './instances'

const collection = '/auth'

export class AuthService {
  static async login(email: string, password: string) {
    const data = { email, password }

    const { access_token } = (await publicInstance.post(`${collection}/login`, data)).data as {
      access_token: string
    }

    return access_token
  }
}
