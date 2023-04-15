import { ManufacturerModels } from '@/models'
import { OutputAdapter } from '@/tools'

export namespace ManufacturerAdapters {
  export const getAll: {
    output: OutputAdapter<any[], ManufacturerModels.MinData[]>
  } = {
    output: response => {
      const convertedResource: ManufacturerModels.MinData[] = response.map(item => ({
        id: item.id,
        name: item.name,
      }))

      return convertedResource
    },
  }
}
