import { AppError, publicInstance } from '@/tools'
import { ManufacturerAdapters } from '../adapters'

const collection = '/manufacturers'

export namespace ManufacturerServices {
  export const getAll = async () => {
    const response = await publicInstance.get(collection)
    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = ManufacturerAdapters.getAll.output(response.data)
    return adaptedResponse
  }
}
