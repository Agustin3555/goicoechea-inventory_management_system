import { ManufacturerAdapters } from '@/adapters'
import { AppError, privateInstance } from '@/tools'

const collection = '/manufacturers'

export namespace ManufacturerServices {
  export const getAll = async () => {
    const response = await privateInstance.get(collection)
    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = ManufacturerAdapters.getAll.output(response.data)
    return adaptedResponse
  }
}
