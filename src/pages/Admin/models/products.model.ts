import { ResourceRef } from '../tools'

export namespace ProductModels {
  interface Char {
    key: string
  }

  interface BooleanChar extends Char {
    value: boolean
  }

  interface QuantityChar extends Char {
    value: number
    unit: string
  }

  interface FractionChar extends Char {
    numeratorValue: number
    denominatorValue: number
    unit: string
  }

  interface StringChar extends Char {
    value: string
  }

  export interface MinData {
    id: number
    name: string
  }

  export interface PublicData {
    category: ResourceRef | null
    manufacturer: ResourceRef | null
    description: string | null
    price: number
    imported: boolean
    discontinued: boolean
    booleanChars: BooleanChar[] | null
    quantityChars: QuantityChar[] | null
    fractionChars: FractionChar[] | null
    stringChars: StringChar[] | null
  }

  export interface PrivateData extends PublicData {
    stock: number
    minStock: number
    createdByUser: ResourceRef
    updatedByUser: ResourceRef | null
    createdAt: string
    updatedAt: string | null
  }

  export interface GetBooleanCharSuggestionsData {
    field: 'KEY'
  }

  export interface GetQuantityCharSuggestionsData {
    key?: string
    field: 'KEY' | 'VALUE' | 'METRIC_UNIT'
  }

  export interface GetFractionCharSuggestionsData {
    key?: string
    field: 'KEY' | 'NUMERATOR_VALUE' | 'DENOMINATOR_VALUE' | 'METRIC_UNIT'
  }

  export interface GetStringCharSuggestionsData {
    key?: string
    field: 'KEY' | 'VALUE'
  }

  export type CharSuggestionsResponse = (number | string)[]

  export interface CreateData {
    name: string
    category?: number
    manufacturer?: number
    description?: string
    stock?: number
    minStock?: number
    price?: number
    imported?: boolean
    discontinued?: boolean
    booleanChars?: BooleanChar[]
    quantityChars?: QuantityChar[]
    fractionChars?: FractionChar[]
    stringChars?: StringChar[]
  }

  export interface EditData {
    name?: string
    category?: number
    manufacturer?: number
    description?: string
    stock?: number
    minStock?: number
    price?: number
    imported?: boolean
    discontinued?: boolean
  }

  export interface EditResponse {
    name?: string
    category?: ResourceRef
    manufacturer?: ResourceRef
    description?: string
    stock?: number
    minStock?: number
    price?: number
    imported?: boolean
    discontinued?: boolean
    updatedByUser: ResourceRef
    updatedAt: string
  }
}
