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

  export const create: {
    input: InputAdapter<ProductModels.CreateData, any>
  } = {
    input: data => {
      const convertedResource = {
        name: data.name,
        category: data.category,
        manufacturer: data.manufacturer,
        description: data.description,
        stock: data.stock,
        minStock: data.minStock,
        price: data.price,
        imported: data.imported,
        discontinued: data.discontinued,
        booleanFields: data.booleanChars?.map(item => ({
          name: item.key,
          value: item.value,
        })),
        quantityFields: data.quantityChars?.map(item => ({
          name: item.key,
          value: item.value,
          metricUnit: item.unit,
        })),
        fractionFields: data.fractionChars?.map(item => ({
          name: item.key,
          numeratorValue: item.numeratorValue,
          denominatorValue: item.denominatorValue,
          metricUnit: item.unit,
        })),
        stringFields: data.stringChars?.map(item => ({
          name: item.key,
          value: item.value,
        })),
      }

      return convertedResource
    },
  }
}
