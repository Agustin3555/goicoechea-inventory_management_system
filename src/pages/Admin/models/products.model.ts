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
    metricUnit: string
  }

  interface FractionChar extends Char {
    numeratorValue: number
    denominatorValue: number
    metricUnit: string
  }

  interface StringChar extends Char {
    value: string
  }

  export interface MinData {
    id: number
    name: string
  }

  export interface PublicData {
    category: ResourceRef
    manufacturer: ResourceRef | null
    description: string | null
    unitPrice: number
    isImported: boolean
    discontinued: boolean
    booleanChars: BooleanChar[]
    quantityChars: QuantityChar[]
    fractionChars: FractionChar[]
    stringChars: StringChar[]
  }

  export interface PrivateData {
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
}
