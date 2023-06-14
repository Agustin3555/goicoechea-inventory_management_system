import { OutputAdapter } from '@/tools'
import { CategoryModels } from '../models'

export namespace CategoryAdapters {
  export const getAll: {
    output: OutputAdapter<any[], CategoryModels.MinData[]>
  } = {
    output: response => {
      const convertedResource: CategoryModels.MinData[] = response.map(item => ({
        id: item.id,
        name: item.name,
      }))

      return convertedResource
    },
  }
}
