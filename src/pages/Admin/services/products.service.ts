import { AppError, privateInstance, publicInstance } from '@/tools'
import { ProductAdapters } from '../adapters'
import { ProductModels } from '../models'

const collection = '/products'

export namespace ProductServices {
  export const getAll = async () => {
    const response = await publicInstance.get(collection)
    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = ProductAdapters.resourceSearch.output(response.data)
    return adaptedResponse
  }

  export const getByName = async (name: string) => {
    const response = await publicInstance.get(`${collection}/${name}`)
    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = ProductAdapters.resourceSearch.output(response.data)
    return adaptedResponse
  }

  export const getOne = async (id: number) => {
    const response = await privateInstance.get(`${collection}/${id}`)
    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = ProductAdapters.getOne.output(response.data)
    return adaptedResponse
  }

  export const getBooleanCharSuggestions = async (
    data: ProductModels.GetBooleanCharSuggestionsData
  ) => {
    const adaptedInput = ProductAdapters.getBooleanCharSuggestions.input(data)

    const response = await publicInstance.post(
      `${collection}/boolean-chars/suggestions`,
      adaptedInput
    )

    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = ProductAdapters.getBooleanCharSuggestions.output(
      response.data
    )
    return adaptedResponse
  }

  export const getQuantityCharSuggestions = async (
    data: ProductModels.GetQuantityCharSuggestionsData
  ) => {
    const adaptedInput = ProductAdapters.getQuantityCharSuggestions.input(data)

    const response = await publicInstance.post(
      `${collection}/quantity-chars/suggestions`,
      adaptedInput
    )

    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = ProductAdapters.getQuantityCharSuggestions.output(
      response.data
    )
    return adaptedResponse
  }

  export const getFractionCharSuggestions = async (
    data: ProductModels.GetFractionCharSuggestionsData
  ) => {
    const adaptedInput = ProductAdapters.getFractionCharSuggestions.input(data)

    const response = await publicInstance.post(
      `${collection}/fraction-chars/suggestions`,
      adaptedInput
    )

    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = ProductAdapters.getFractionCharSuggestions.output(
      response.data
    )
    return adaptedResponse
  }

  export const getStringCharSuggestions = async (
    data: ProductModels.GetStringCharSuggestionsData
  ) => {
    const adaptedInput = ProductAdapters.getStringCharSuggestions.input(data)

    const response = await publicInstance.post(
      `${collection}/string-chars/suggestions`,
      adaptedInput
    )

    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = ProductAdapters.getStringCharSuggestions.output(
      response.data
    )
    return adaptedResponse
  }

  export const create = async (data: ProductModels.CreateData) => {
    const adaptedInput = ProductAdapters.create.input(data)

    const response = await privateInstance.post(collection, adaptedInput)

    if (!response || response instanceof AppError) return response as AppError

    return true
  }

  export const edit = async (id: number, data: ProductModels.EditData) => {
    const adaptedInput = ProductAdapters.edit.input(data)

    const response = await privateInstance.put(`${collection}/${id}`, adaptedInput)
    if (!response || response instanceof AppError) return response as AppError

    const adaptedResponse = ProductAdapters.edit.output(response.data)
    return adaptedResponse
  }
}
