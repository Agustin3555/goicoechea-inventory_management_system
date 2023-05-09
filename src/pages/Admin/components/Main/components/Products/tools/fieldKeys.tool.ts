import { getComplexFieldKey } from './getComplexFieldKey.tool'

export namespace QuantityFields {
  const root = 'quantityChars'

  export const getKey = (index: number) => getComplexFieldKey(root, index, 'key')

  export const getValue = (index: number) => getComplexFieldKey(root, index, 'value')

  export const getMetricUnit = (index: number) => getComplexFieldKey(root, index, 'metricUnit')
}

export namespace FractionFields {
  const root = 'fractionChars'

  export const getKey = (index: number) => getComplexFieldKey(root, index, 'key')

  export const getNumeratorValue = (index: number) =>
    getComplexFieldKey(root, index, 'numeratorValue')

  export const getDenominatorValue = (index: number) =>
    getComplexFieldKey(root, index, 'denominatorValue')

  export const getMetricUnit = (index: number) => getComplexFieldKey(root, index, 'metricUnit')
}

export namespace StringFields {
  const root = 'stringChars'

  export const getKey = (index: number) => getComplexFieldKey(root, index, 'key')

  export const getValue = (index: number) => getComplexFieldKey(root, index, 'value')
}
