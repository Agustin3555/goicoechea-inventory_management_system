import { InputAdapter, OutputAdapter } from '@/tools'
import { ProductModels } from '../models'
import { asAppDate } from '../tools'

export namespace ProductAdapters {
  export const resourceSearch: {
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
    output: OutputAdapter<any, ProductModels.PrivateData>
  } = {
    output: response => {
      const convertedResource: ProductModels.PrivateData = {
        description: response.description,
        stock: response.stock,
        minStock: response.minStock,
        price: response.price,
        imported: response.imported,
        discontinued: response.discontinued,
        createdAt: asAppDate(response.createdAt) as string,
        updatedAt: asAppDate(response.updatedAt),
        category: response.category && {
          id: response.category.id,
          text: response.category.name,
        },
        manufacturer: response.manufacturer && {
          id: response.manufacturer.id,
          text: response.manufacturer.name,
        },
        createdByUser: {
          id: response.createdByUser.id,
          text: response.createdByUser.email,
        },
        updatedByUser: response.updatedByUser && {
          id: response.updatedByUser.id,
          text: response.updatedByUser.email,
        },
        booleanChars:
          response.booleanFields &&
          response.booleanFields.map((item: any) => ({
            key: item.name,
            value: item.value,
          })),
        quantityChars:
          response.quantityFields &&
          response.quantityFields.map((item: any) => ({
            key: item.name,
            value: item.value,
            unit: item.metricUnit,
          })),
        fractionChars:
          response.fractionFields &&
          response.fractionFields.map((item: any) => ({
            key: item.name,
            numeratorValue: item.numeratorValue,
            denominatorValue: item.denominatorValue,
            unit: item.metricUnit,
          })),
        stringChars:
          response.stringFields &&
          response.stringFields.map((item: any) => ({
            key: item.name,
            value: item.value,
          })),
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

  export const edit: {
    input: InputAdapter<ProductModels.EditData, any>
    output: OutputAdapter<any, ProductModels.EditResponse>
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
      }

      return convertedResource
    },
    output: response => {
      const convertedResource: ProductModels.EditResponse = {
        name: response.name,
        description: response.description,
        stock: response.stock,
        minStock: response.minStock,
        price: response.price,
        imported: response.imported,
        discontinued: response.discontinued,
        category: response.category && {
          id: response.category.id,
          text: response.category.name,
        },
        manufacturer: response.manufacturer && {
          id: response.manufacturer.id,
          text: response.manufacturer.name,
        },
        updatedByUser: response.updatedByUser && {
          id: response.updatedByUser.id,
          text: response.updatedByUser.email,
        },
        updatedAt: asAppDate(response.updatedAt) as string,
      }

      return convertedResource
    },
  }
}
