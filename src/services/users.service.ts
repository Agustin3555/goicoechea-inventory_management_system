import { getAllAdapter, getOneAdapter, meAdapter, newAdapter, updateAdapter } from '@/adapters'
import { User_NewData, User_UpdateData } from '@/models'
import { privateInstance } from '@/tools'

const collection = '/users'

export class UsersService {
  static async me() {
    const response = await privateInstance.get(`${collection}/me`)
    if (!response) return undefined

    const adaptedResponse = meAdapter.output(response.data)
    return adaptedResponse
  }

  static async getAll() {
    const response = await privateInstance.get(collection)
    if (!response) return undefined

    const adaptedResponse = getAllAdapter.output(response.data)
    return adaptedResponse
  }

  static async getOne(params: { id: number }) {
    const { id } = params

    const response = await privateInstance.get(`${collection}/${id}`)
    if (!response) return undefined

    const adaptedResponse = getOneAdapter.output(response.data)
    return adaptedResponse
  }

  static async new(data: User_NewData) {
    const adaptedInput = newAdapter.input(data)

    const response = await privateInstance.post(collection, adaptedInput)
    if (!response) return undefined

    return true
  }

  static async update(data: User_UpdateData, params: { id: number }) {
    const { id } = params
    const adaptedInput = updateAdapter.input(data)

    const response = await privateInstance.put(`${collection}/${id}`, adaptedInput)
    if (!response) return undefined

    const adaptedResponse = updateAdapter.output(response.data)
    return adaptedResponse
  }

  static async delete(params: { id: number }) {
    const { id } = params

    const response = await privateInstance.delete(`${collection}/${id}`)
    if (!response) return undefined

    return true
  }
}
