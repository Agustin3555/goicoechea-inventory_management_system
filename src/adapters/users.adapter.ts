import { UserModels } from '@/models'
import { InputAdapter, OutputAdapter } from '@/tools'

export namespace UserAdapters {
  export const me: {
    output: OutputAdapter<any, UserModels.FullData>
  } = {
    output: response => {
      const convertedResource: UserModels.FullData = {
        id: response.id,
        name: response.name,
        lastName: response.lastName,
        email: response.email,
        role: response.role,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      }

      return convertedResource
    },
  }

  export const getAll: {
    output: OutputAdapter<any[], UserModels.MinData[]>
  } = {
    output: response => {
      const convertedResource: UserModels.MinData[] = response.map(item => ({
        id: item.id,
        name: item.name,
      }))

      return convertedResource
    },
  }

  export const getOne: {
    output: OutputAdapter<any, UserModels.RemainingData>
  } = {
    output: response => {
      const convertedResource: UserModels.RemainingData = {
        lastName: response.lastName,
        email: response.email,
        role: response.role,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      }

      return convertedResource
    },
  }

  export const create: {
    input: InputAdapter<UserModels.CreateData, UserModels.CreateBody>
  } = {
    input: data => {
      const convertedResource: UserModels.CreateBody = {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
      }

      return convertedResource
    },
  }

  export const update: {
    input: InputAdapter<UserModels.UpdateData, UserModels.UpdateBody>
    output: OutputAdapter<any, UserModels.UpdateResponse>
  } = {
    input: data => {
      const convertedResource: UserModels.UpdateBody = {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
      }

      return convertedResource
    },
    output: response => {
      const convertedResource: UserModels.UpdateResponse = {
        name: response.name,
        lastName: response.lastName,
        email: response.email,
        role: response.role,
        updatedAt: response.updatedAt,
      }

      return convertedResource
    },
  }
}
