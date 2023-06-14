import { AppError, privateInstance } from '@/tools'
import { CategoryAdapters } from '../adapters'

const collection = '/categories'

export namespace CategoryServices {
  export const getAll = async () => {
    const response = await privateInstance.get(collection)
    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = CategoryAdapters.getAll.output(response.data)
    return adaptedResponse
  }
}
