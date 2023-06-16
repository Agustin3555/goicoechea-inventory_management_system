import { AppError, privateInstance, publicInstance } from '@/tools'
import { CategoryAdapters } from '../adapters'

const collection = '/categories'

export namespace CategoryServices {
  export const getAll = async () => {
    const response = await publicInstance.get(collection)
    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = CategoryAdapters.getAll.output(response.data)
    return adaptedResponse
  }
}
