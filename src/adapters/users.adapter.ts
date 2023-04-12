import {
  User_MinData,
  User_NewBody,
  User_NewData,
  User_RemainingData,
  User_UpdateBody,
  User_UpdateData,
  User_UpdateResponse,
  User_FullData,
} from '@/models'
import { InputAdapter, OutputAdapter } from '@/tools'

export const meAdapter: {
  output: OutputAdapter<any, User_FullData>
} = {
  output: response => {
    const convertedResource: User_FullData = {
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

export const getAllAdapter: {
  output: OutputAdapter<any[], User_MinData[]>
} = {
  output: response => {
    const convertedResource: User_MinData[] = response.map(item => ({
      id: item.id,
      name: item.name,
    }))

    return convertedResource
  },
}

export const getOneAdapter: {
  output: OutputAdapter<any, User_RemainingData>
} = {
  output: response => {
    const convertedResource: User_RemainingData = {
      lastName: response.lastName,
      email: response.email,
      role: response.role,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    }

    return convertedResource
  },
}

export const newAdapter: {
  input: InputAdapter<User_NewData, User_NewBody>
} = {
  input: data => {
    const convertedResource: User_NewBody = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
    }

    return convertedResource
  },
}

export const updateAdapter: {
  input: InputAdapter<User_UpdateData, User_UpdateBody>
  output: OutputAdapter<any, User_UpdateResponse>
} = {
  input: data => {
    const convertedResource: User_UpdateBody = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
    }

    return convertedResource
  },
  output: response => {
    const convertedResource: User_UpdateResponse = {
      name: response.name,
      lastName: response.lastName,
      email: response.email,
      role: response.role,
      updatedAt: response.updatedAt,
    }

    return convertedResource
  },
}
