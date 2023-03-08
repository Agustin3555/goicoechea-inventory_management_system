import { User } from '@/models'
import { privateInstance } from './instances'

const collection = '/users'

export class UsersService {
  static async me() {
    const user = (await privateInstance.get(`${collection}/me`)).data as User

    return user
  }
}
