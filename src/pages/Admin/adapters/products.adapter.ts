import { InputAdapter, OutputAdapter } from '@/tools'
import { ProductModels } from '../models'

export namespace ProductAdapters {
  export const getAll: {
    output: OutputAdapter<any[], ProductModels.MinData[]>
  } = {
    output: response => {
      const convertedResource: ProductModels.MinData[] = response.map(item => ({
        id: item.id,
        name: item.name,
      }))

      return convertedResource
    },
  }

  export const getOne: {
    output: OutputAdapter<any, ProductModels.PublicData>
  } = {
    output: response => {
      const convertedResource: ProductModels.PublicData = {
        lastName: response.lastName,
        email: response.email,
        role: response.role,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      }

      return convertedResource
    },
  }

  export const getBooleanCharSuggestions: {
    input: InputAdapter<ProductModels.GetBooleanCharSuggestionsData, any>
    output: OutputAdapter<any, ProductModels.CharSuggestionsResponse>
  } = {
    input: data => {
      const convertedResource = {
        field: data.field,
      }

      return convertedResource
    },
    output: response => {
      const convertedResource: ProductModels.CharSuggestionsResponse = response

      return convertedResource
    },
  }

  export const getQuantityCharSuggestions: {
    input: InputAdapter<ProductModels.GetQuantityCharSuggestionsData, any>
    output: OutputAdapter<any, ProductModels.CharSuggestionsResponse>
  } = {
    input: data => {
      const convertedResource = {
        name: data.key,
        field: data.field,
      }

      return convertedResource
    },
    output: response => {
      const convertedResource: ProductModels.CharSuggestionsResponse = response

      return convertedResource
    },
  }

  export const getFractionCharSuggestions: {
    input: InputAdapter<ProductModels.GetFractionCharSuggestionsData, any>
    output: OutputAdapter<any, ProductModels.CharSuggestionsResponse>
  } = {
    input: data => {
      const convertedResource = {
        name: data.key,
        field: data.field,
      }

      return convertedResource
    },
    output: response => {
      const convertedResource: ProductModels.CharSuggestionsResponse = response

      return convertedResource
    },
  }

  export const getStringCharSuggestions: {
    input: InputAdapter<ProductModels.GetStringCharSuggestionsData, any>
    output: OutputAdapter<any, ProductModels.CharSuggestionsResponse>
  } = {
    input: data => {
      const convertedResource = {
        name: data.key,
        field: data.field,
      }

      return convertedResource
    },
    output: response => {
      const convertedResource: ProductModels.CharSuggestionsResponse = response

      return convertedResource
    },
  }
}
