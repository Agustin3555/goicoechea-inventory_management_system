import { UserAdapters } from '@/adapters'
import { UserModels } from '@/models'
import { AppError, privateInstance } from '@/tools'

const collection = '/users'

export namespace UserServices {
  export const me = async () => {
    const response = await privateInstance.get(`${collection}/me`)
    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = UserAdapters.me.output(response.data)
    return adaptedResponse
  }

  export const getAll = async () => {
    const response = await privateInstance.get(collection)
    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = UserAdapters.getAll.output(response.data)
    return adaptedResponse
  }

  export const getOne = async (params: { id: number }) => {
    const { id } = params

    const response = await privateInstance.get(`${collection}/${id}`)
    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = UserAdapters.getOne.output(response.data)
    return adaptedResponse
  }

  export const create = async (data: UserModels.CreateData) => {
    const adaptedInput = UserAdapters.create.input(data)

    const response = await privateInstance.post(collection, adaptedInput)
    if (!response || response instanceof AppError) return response as AppError

    return true
  }

  export const update = async (data: UserModels.UpdateData, params: { id: number }) => {
    const { id } = params
    const adaptedInput = UserAdapters.update.input(data)

    const response = await privateInstance.put(`${collection}/${id}`, adaptedInput)
    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = UserAdapters.update.output(response.data)
    return adaptedResponse
  }

  export const remove = async (params: { id: number }) => {
    const { id } = params

    const response = await privateInstance.delete(`${collection}/${id}`)
    if (!response || response instanceof AppError) return response as AppError

    return true
  }
}
